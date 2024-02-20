import { createContext, useEffect, useState, useContext } from "react"
import socket from "socket.io-client"

const getSocket = () => {
    return socket(import.meta.env.VITE_SOCKET_SERVER)
}

const socketContext = createContext({
    socket: null
})

export const useSocket = () => useContext(socketContext);

export default function SocketProvider({ children }) {
    const _socket = getSocket()
    const [socketIO, setSocketIO] = useState(null)

    useEffect(() => {
        if (_socket) {
            setSocketIO(_socket)
        }
    }, [])

    return (
        <socketContext.Provider value={{ sockets: socketIO }}>
            {children}
        </socketContext.Provider>
    )
}