import { io } from 'socket.io-client';

let socket;

/**
 * @typedef {import('socket.io-client').socket} socket
 * @returns {socket} socket - The socket instance.
 */
export const getSocket = () => {
    if (!socket) {
        socket = io("http://localhost:4000", {
            autoConnect: false,
            transports: ["websocket"],
        });
    }

    return socket;
};