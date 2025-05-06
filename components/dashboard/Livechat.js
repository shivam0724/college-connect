"use client";
import React, { useState } from 'react'
import { Button } from '../shadcn/ui/button';
import { getSocket } from '@/hooks/socket';
import { RefreshCw } from 'lucide-react';
import Chat from './subs/Chat';

const socket = getSocket();

const Livechat = ({ role, session }) => {
    const [spin, setSpin] = useState(false);

    const handleRefresh = () => {
        setSpin(true);
        socket.connect();
        setTimeout(() => { setSpin(false) }, 1000);
    }

    return (
        <div className='w-full h-full flex flex-col flex-1'>
            <div className='text-2xl w-full font-semibold h-10 flex justify-between'><h2 className='text-left'>Live Chat</h2>
                <div>
                    <Button onClick={(e) => handleRefresh(e)} className={"min-h-4"} title={"sync messages"}><RefreshCw className={spin ? 'animate-spin' : ""} /> </Button>
                </div>
            </div>
            <Chat role={role} session={session} socket={socket} />
        </div>
    )
}

export default Livechat


// <div key={i} className={`flex ${msg.sender === user ? 'justify-end' : 'justify-start'}`}>
//     {/* <div className="font-semibold text-sm">{msg.sender}</div> */}
//     <div className={`px-3 py-1.5 rounded-lg max-w-xs break-words ${msg.sender === user
//         ? 'bg-[#13202d] text-gray-50' : 'bg-gray-200 text-gray-800'}`} >
//         {msg.text}
//         <div className={`text-[12px] w-full p-0.5 ${msg.sender === user ? "text-right" : "text-left"}`}>{msg.time}</div>
//     </div>
// </div>
// "use client";
// import React, { useRef, useState, useEffect } from 'react'
// import { Button } from '../shadcn/ui/button';
// import { Input } from '../shadcn/ui/input';
// import { getSocket } from '@/hooks/socket';
// import { cn } from '@/lib/shadcn/utils';
// import { Avatar, AvatarFallback, AvatarImage } from '../shadcn/ui/avatar';
// import { RefreshCw } from 'lucide-react';

// const socket = getSocket();

// const Livechat = ({ role, session }) => {
//     const [messages, setMessages] = useState([]);
//     const [msg, setMsg] = useState("");
//     const [user, setUser] = useState(session?.username || "");
//     const [spin, setSpin] = useState(false);

//     const messagesEndRef = useRef(null);

//     useEffect(() => {
//         setUser(session?.username || "");
//     }, [session]);

//     useEffect(() => {
//         setTimeout(() => socket.connect(), 100);
//         socket.on("message", handleNewMessage);
//         socket.on("message history", handleHistory);

//         return () => {
//             socket.off("message", handleNewMessage);
//             socket.off("message history", handleHistory);
//         };
//     }, []);

//     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

//     const sendMessage = () => {
//         if (msg.trim()) {
//             const newMessage = {
//                 sender: user,
//                 role: role,
//                 text: msg,
//                 time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//             };
//             socket.emit("message", newMessage);
//             setMsg("");
//         }
//     };

//     const handleNewMessage = (msg) => {
//         setMessages(prev => [...prev, msg]);
//     };

//     const handleHistory = (history) => {
//         setMessages(history);
//     };

//     const handleRefresh = ()=>{
//         setSpin(true);
//         socket.connect();
//         setTimeout(() => { setSpin(false) }, 1000);
//     }

//     return (
//         <div className='w-full h-full flex flex-col flex-1'>
//             <div className='text-2xl w-full font-semibold h-10 flex justify-between'><h2 className='text-left'>Live Chat</h2>
//                 <div>
//                     <Button onClick={(e) => handleRefresh(e)} className={"min-h-4"} title={"sync messages"}><RefreshCw className={spin ? 'animate-spin' : ""} /> </Button>
//                 </div>
//             </div>
//             <div className='mt-8 font-medium w-full flex flex-col justify-between h-full relative max-h-[calc(100vh-16rem)] max-sm:max-h-[calc(100vh-8rem)]'>
//                 <div className="flex-1 overflow-y-auto py-2 flex flex-col space-y-2 space-y-reverse h-full px-4 no-scrollbar gap-2">
//                     {messages.map((msg, i) => {
//                         return (
//                             <ChatMessage key={i} side={msg.sender === user ? "sent" : "received"} time={msg.time} user={{ name: msg.sender }}>
//                                 {msg.text}
//                             </ChatMessage>

//                         )
//                     })}
//                     <div ref={messagesEndRef} />
//                 </div>
//                 <div className="flex items-center pt-1 w-full h-12 relative bottom-0 px-4">
//                     <div className="fji w-full space-x-2">
//                         <Input onKeyDown={(e) => { e.key === "Enter" ? sendMessage() : null }} value={msg} onChange={(e) => setMsg(e.target.value)} className={"min-h-4 py-1"} type={"text"} placeholder={"message"} />
//                         <Button onClick={() => sendMessage()} className={"min-h-4"}>Send</Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Livechat

// export function ChatMessage({ side = "received", time, children, user = { avatar: "/avatar/avatar.svg", name: "sender" } }) {
//     return (
//         <div className={cn("flex", side === "sent" ? "justify-end" : "justify-start")}>
//             <div className='flex flex-nowrap items-end gap-2'>
//                 {side === "sent" ? null : (
//                     <Avatar className="h-8 w-8 rounded-lg mb-1.5">
//                         <AvatarImage src={user.avatar ? user.avatar : "/avatar/avatar.svg"} alt={user.name ? user.name : "sender"} />
//                         <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//                     </Avatar>
//                 )}
//                 <div className={cn("px-3 py-1.5 rounded-lg text-pretty", side === "sent"
//                     ? 'bg-[#13202d] text-gray-50' : 'bg-gray-200 text-gray-800', "flex flex-col")}>
//                     {side === "sent" ? null : (
//                         <div className='text-shadow-slate-950 border border-b-gray-300 w-full mb-1'>{user.name}</div>
//                     )}
//                     <div className='flex flex-col'>
//                         <div className='inline-flex justify-between flex-wrap w-full text-pretty'>
//                             <div className='flex justify-between items-end gap-2 w-full'>
//                                 <span className='break-words text-pretty flex-1 max-w-xs pl-0.5'>{children}</span>
//                                 <div className="text-[11px] text-nowrap text-gray-500">{time}</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// <div key={i} className={`flex ${msg.sender === user ? 'justify-end' : 'justify-start'}`}>
//     {/* <div className="font-semibold text-sm">{msg.sender}</div> */}
//     <div className={`px-3 py-1.5 rounded-lg max-w-xs break-words ${msg.sender === user
//         ? 'bg-[#13202d] text-gray-50' : 'bg-gray-200 text-gray-800'}`} >
//         {msg.text}
//         <div className={`text-[12px] w-full p-0.5 ${msg.sender === user ? "text-right" : "text-left"}`}>{msg.time}</div>
//     </div>
// </div>