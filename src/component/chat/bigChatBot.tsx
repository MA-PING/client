'use client'

import ChatBot from "@/component/chat/chatBot";
import {useState} from 'react';
import {recommendResponse} from "@/interfaces/character";
import type {NextPage} from "next";



interface BigChatBotProps {
    initialUserRecommend: recommendResponse | null,
    initialCharacterRecommend: null | recommendResponse,
    initialCharacterName: null | string
}


const BigChatBot: NextPage<BigChatBotProps> = ({initialUserRecommend, initialCharacterRecommend, initialCharacterName}) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    // 채팅창 열림/닫힘 토글 함수
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen ">
                <ChatBot onClose={toggleChat} size={false}
                         initialUserRecommend={initialUserRecommend}
                         initialCharacterRecommend={initialCharacterRecommend}
                         initialCharacterName={initialCharacterName}
                />
            </div>
        </>
    );
}

export default BigChatBot;