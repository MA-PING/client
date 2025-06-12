// ChatDialog.tsx
import React from 'react';
import styles from '@/styles/chat/ChatDialog.module.css'; // FloatingButton과 동일한 CSS 모듈 사용

interface ChatDialogProps {
    onClose: () => void; // 닫기 버튼 클릭 시 호출될 함수
}

const ChatDialog: React.FC<ChatDialogProps> = ({ onClose }) => {
    return (
        <div className={styles.chatDialog}>
            <div className={styles.chatDialogHeader}>
                <span>채팅봇</span>
                <button onClick={onClose} className={styles.closeButton} aria-label="닫기">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div className={styles.chatDialogBody}>
                <p>안녕하세요! 무엇을 도와드릴까요?</p>
                {/* 예시 메시지 */}
                <div className={styles.chatMessage}>
                    <p className={styles.userMessage}>제 캐릭터 정보를 분석해주세요.</p>
                </div>
                <div className={styles.chatMessage}>
                    <p className={styles.botMessage}>네, 잠시만 기다려주세요...</p>
                </div>
            </div>
            <div className={styles.chatDialogFooter}>
                <input type="text" placeholder="메시지를 입력하세요..." className={styles.chatInput} />
                <button className={styles.sendButton}>전송</button>
            </div>
        </div>
    );
};

export default ChatDialog;