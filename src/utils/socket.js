import { io } from "socket.io-client"

const SOCKET_SERVER = "http://localhost:6969"

const socket = io(SOCKET_SERVER, {
    autoConnect: false
})

export default socket