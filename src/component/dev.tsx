import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/dev.module.css';


const dev:NextPage = () => {
    return (
        <div className={styles.content}>
            <Image className={styles.firefly202503201730031} width={400} height={400} alt="" src="/images/dev_images.png" />
            <div className={styles.container}>
                <div className={styles.title}>
                    <div className={styles.div}>🛠️ 아직 개발중이에요</div>
                    <div className={styles.div1}>
            						<span className={styles.txt}>
              							<p className={styles.p}>여러분의 길라잡이 메이핑이 열심히 작업중이에요.</p>
              							<p className={styles.p}>개발 소식을 메일로 받고싶다면 아래 버튼을 클릭해주세요!</p>
            						</span>
                    </div>
                </div>
                <div className={styles.wrapButton}>
                    <div className={styles.button}>
                        <div className={styles.button1}>홈으로</div>
                    </div>
                    <div className={styles.button2}>
                        <div className={styles.button1}>개발 소식 받기</div>
                    </div>
                </div>
            </div>
        </div>);
};

export default dev;
