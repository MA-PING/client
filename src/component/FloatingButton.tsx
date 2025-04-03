import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/FloatingButton.module.css';


const FloatingButton:NextPage = () => {
    return (
        <div className={styles.wrapChatbot}>
            <div className={styles.bubbleChatbot}>
                <div className={styles.wrap}>
                    <div className={styles.div}>내 캐릭터에 딱 맞는 맞춤 정보를 원한다면?</div>
                </div>
                <div className={styles.arrow}>
                    <Image className={styles.arrowIcon} width={22} height={9} alt="" src="/icons/arrow.svg" />
                </div>
            </div>
            <button className={styles.chatbotShrink}>
                <Image className={styles.iconchatbot} width={80} height={80} alt="" src="/icons/chatbot.svg" />
            </button>
        </div>);
};

export default FloatingButton;
          					