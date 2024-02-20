import cookie from "cookie";
import jwt from "jsonwebtoken";
import { Server, Socket } from "socket.io";
import { ChatEvent } from "./utils";
import { ErrorHandler } from "@handlers/error";
import { JWT_SECRET } from "@server/config";
import { Payload } from "@types_/user/session";
import Session from "@server/models/user/session";
import IUser from "@types_/user";
import { Request } from "express";

const handler = new ErrorHandler("socket")

const mountJoinChatEvent = (socket: Socket) => {
    socket.on(ChatEvent.JOIN_CHAT_EVENT, (chatId) => {
        console.log(`User joined the chat 🤝. chatId: `, chatId);
        socket.join(chatId);
    });
};

const mountParticipantTypingEvent = (socket: Socket) => {
    socket.on(ChatEvent.TYPING_EVENT, (chatId: string) => {
        socket.in(chatId).emit(ChatEvent.TYPING_EVENT, chatId);
    });
};

const mountParticipantStoppedTypingEvent = (socket: Socket) => {
    socket.on(ChatEvent.STOP_TYPING_EVENT, (chatId: string) => {
        socket.in(chatId).emit(ChatEvent.STOP_TYPING_EVENT, chatId);
    });
};

export const initializeSocketIO = (io: Server) => {
    return io.on("connection", async (socket: Socket) => {
        try {
            const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
            let token = cookies?.accessToken; // get the accessToken
            if (!token) {
                token = socket.handshake.auth?.token;
            }

            if (!token) {
                return handler.error("Invalid Token")
            }
            const decodedToken = jwt.verify(token, JWT_SECRET) as Payload;
            const session = await Session.findById(decodedToken?._id).populate("user")
            if (!session) {
                handler.error(handler.STATUS_404)
            }
            const user = session?.user as IUser
            (socket as any).user = user;
            socket.join(user._id.toString());
            socket.emit(ChatEvent.CONNECTED_EVENT);
            console.log("User connected 🗼. userId: ", user._id.toString());
            mountJoinChatEvent(socket);
            mountParticipantTypingEvent(socket);
            mountParticipantStoppedTypingEvent(socket);
            socket.on(ChatEvent.DISCONNECT_EVENT, () => {
                console.log("user has disconnected 🚫. userId: " + (socket as any).user?._id);
                if ((socket as any).user?._id) {
                    socket.leave((socket as any).user._id);
                }
            });
        } catch (error) {
            socket.emit(
                ChatEvent.SOCKET_ERROR_EVENT,
                "Something went wrong while connecting to the socket."
            );
        }
    });
};

export const emitSocketEvent = (req: Request, roomId: string, event: string, payload: Function | string) => {
    (req.app.get("io") as Socket).in(roomId).emit(event, payload);
};