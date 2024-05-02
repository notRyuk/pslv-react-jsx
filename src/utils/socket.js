import { io } from "socket.io-client"

const SOCKET_SERVER = import.meta.env.VITE_SOCKET_SERVER

const socket = io(SOCKET_SERVER, {
    autoConnect: false
})

export default socket