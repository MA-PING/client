'use client'

import ChatBot from "@/component/chat/chatBot";
import { useState } from 'react';


export default function Home() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    // 채팅창 열림/닫힘 토글 함수
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen ">
                <ChatBot onClose={toggleChat} size={true}/>
            </div>
        </>
    );
}