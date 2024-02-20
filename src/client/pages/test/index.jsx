import { useSocket } from "@client/context/socket";
import React, { useEffect, useState } from "react";
import { ChatEventEnum } from "@utils/chat";

export default function Page() {
    const { socket } = useSocket()
    const [isConnected, setIsConnected] = useState(false);
    const onConnect = () => {
        setIsConnected(true);
    };

    const onDisconnect = () => {
        setIsConnected(false);
    }

    useEffect(() => {
        if (!socket) return;
        socket.on(ChatEventEnum.CONNECTED_EVENT, onConnect);
        socket.on(ChatEventEnum.DISCONNECTED_EVENT, onDisconnect)

        return () => {
            socket.off(ChatEventEnum.CONNECTED_EVENT, onConnect);
            socket.off(ChatEventEnum.DISCONNECTED_EVENT, onDisconnect)
        }
    }, [socket])

    return (
        <>
            Testing socket {isConnected}
        </>
    )
}