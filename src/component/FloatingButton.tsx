"use client"

import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/FloatingButton.module.css'; // CSS Modules 사용
import { usePathname } from "next/navigation";
import { useState } from 'react';
// import ChatDialog from "@/component/chat/ChatDialog";
import ChatBot from "@/component/chat/chatBot"; // useState 훅 임포트

const FloatingButton: NextPage = () => {
    const pathname = usePathname();
    const [isChatOpen, setIsChatOpen] = useState(false);
    // 채팅창 열림/닫힘 토글 함수
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    // 현재 경로에 따라 플로팅 UI를 표시할지 여부 결정
    const shouldShowFloatingUI =
        pathname === '/' ||
        pathname === '/my-character' ||
        pathname === '/simulator' ||
        pathname === '/ranking' ||
        pathname.startsWith('/c/');

    // 해당 경로가 아니면 아무것도 렌더링하지 않음
    if (!shouldShowFloatingUI) {
        return null;
    }

    return (
        <>
            {/* 채팅창이 닫혀 있을 때 플로팅 버튼과 말풍선 표시 */}
            {!isChatOpen && (
                <div className={styles.wrapChatbot}>
                    <div className={styles.bubbleChatbot}>
                        <div className={styles.wrap}>
                            <div className={styles.div}>내 캐릭터에 딱 맞는 맞춤 정보를 원한다면?</div>
                        </div>
                        <div className={styles.arrow}>
                            <Image className={styles.arrowIcon} width={22} height={9} alt="" src="/icons/arrow.svg" />
                        </div>
                    </div>
                    <button className={styles.chatbotShrink} onClick={toggleChat}> {/* 버튼 클릭 시 toggleChat 호출 */}
                        <Image className={styles.iconchatbot} width={80} height={80} alt="" src="/icons/chatbot.svg" />
                    </button>
                </div>
            )}

            {/* 채팅창이 열려 있을 때 채팅 다이얼로그 표시 */}
            {isChatOpen && (
                // <ChatDialog onClose={toggleChat} />
                <ChatBot onClose={toggleChat} size={false}/>
            )}
        </>
    );
};

export default FloatingButton;