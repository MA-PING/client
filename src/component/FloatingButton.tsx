// components/FloatingButton.tsx
import styles from '../styles/FloatingButton.module.css';
import { FunctionComponent } from 'react';
import Image from "next/image";

interface FloatingButtonProps {
    children?: React.ReactNode; // children prop에 대한 타입 정의 (선택적)
    onClick: () => void;
}

const FloatingButton: FunctionComponent<FloatingButtonProps> = ({ children, onClick }) => {
    return (
        <div className={styles.chatbotContainer}> {/* 컨테이너 div 추가 */}
            <button className={styles.chatbot} onClick={onClick}>
                <Image
                    className={styles.iconchatbot}
                    src="/icons/chatbot.svg"
                    alt="챗봇 아이콘"
                    width={80}  // 이미지 크기 지정
                    height={80} // 이미지 크기 지정
                />
            </button>
        </div>
    );
};

export default FloatingButton;
