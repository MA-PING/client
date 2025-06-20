import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/dev.module.css';
import Link from 'next/link'; // Link 임포트

const DevPage: NextPage = () => { // 컴포넌트 이름은 소문자로 시작할 수 없으므로 DevPage로 변경
    return (
        <div className={styles.content}>
            <Image className={styles.devImage} width={400} height={400} alt="개발 중인 캐릭터 일러스트" src="/images/dev_images.png" priority />
            <div className={styles.container}>
                <div className={styles.title}>
                    <div className={styles.mainTitle}>🛠️ 아직 개발중이에요</div>
                    <div className={styles.description}>
                       <span className={styles.txt}>
                          <p className={styles.p}>여러분의 길라잡이 메이핑이 열심히 작업중이에요.</p>
                          <p className={styles.p}>개발 소식을 메일로 받고싶다면 아래 버튼을 클릭해주세요!</p>
                       </span>
                    </div>
                </div>
                <div className={styles.wrapButton}>
                    {/* Link 컴포넌트로 홈 버튼 감싸기 */}
                    <Link href="/" passHref>
                        <div className={styles.buttonHome}>홈으로</div>
                    </Link>
                    {/* 외부 링크나 다른 페이지로 연결한다면 Link 사용 */}
                    <div className={styles.buttonSubscribe}>
                        개발 소식 받기
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevPage;