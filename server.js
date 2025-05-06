"use server";

import e from "express";
import http from "http";
import { Server } from "socket.io";

const app = e();
const port = 4000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const messages = [
    { sender: 'test', role: 'faculty', text: 'Welcome to the live chat! Let me know how I can assist you.', time: '03:11 PM' },
    { sender: 'test1', role: 'student', text: 'Hi! I have a question about the upcoming exam.', time: '03:12 PM' },
    { sender: 'test', role: 'faculty', text: 'Sure! What would you like to know?', time: '03:13 PM' },
    { sender: 'test1', role: 'student', text: 'What topics should we focus on for the essay section?', time: '03:14 PM' },
    { sender: 'test', role: 'faculty', text: 'Great question! Make sure to review case studies from chapters 4 and 5.', time: '03:15 PM' }
];

try {
    io.on("connection", (socket) => {
        console.log("A user connected!", "saved messages:", messages.length);

        socket.emit("message history", messages);

        socket.on("message", (msg) => {
            messages.push(msg);

            if (messages.length > 30) {
                messages.shift();
            }

            io.emit("message", msg);
        });


        socket.on("disconnect", (reason) => {
            console.log("A user disconnected:", reason);
        });
    })
} catch (error) {
    console.error("[socket.js]: ", error);
}

server.listen(port, () => {
    console.log(`Socket Server running on http://localhost:${port}`);
});