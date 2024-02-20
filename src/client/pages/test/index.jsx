import { useSocket } from "@client/context/socket";
import React, { useState } from "react";

export default function Page() {
    const { socket } = useSocket()
    const [isConnected, setIsConnected] = useState(false);
    const onConnect = () => {
        setIsConnected(true);
    };

    return (
        <>
            Testing socket {isConnected}
        </>
    )
}