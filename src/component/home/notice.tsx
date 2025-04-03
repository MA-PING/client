import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../../styles/home/notice.module.css';

const Notice:NextPage = () => {
    return (<div className={styles.ai}>
        <div className={styles.notes}>
            <div className={styles.div}>메이플스토리 패치 노트 요약</div>
            <div className={styles.div1}>1.2.395(5) 업데이트</div>
        </div>
        <div className={styles.wrapAccordian}>
            <div className={styles.accordian}>
                <div className={styles.wrap}>
                    <div className={styles.div2}>캡틴 스킬과 리부트 월드에서 생기는 오류 수정</div>
                    <div className={styles.wrap1}>
                        <div className={styles.div3}>2025.03.01</div>
                        <Image className={styles.icon} width={32} height={32} alt="" src="/icons/arrow_down.svg" />
                    </div>
                </div>
            </div>
            <div className={styles.accordian}>
                <div className={styles.wrap}>
                    <div className={styles.div2}>캡틴 스킬과 리부트 월드에서 생기는 오류 수정</div>
                    <div className={styles.wrap1}>
                        <div className={styles.div3}>2025.03.01</div>
                        <Image className={styles.icon} width={32} height={32} alt="" src="/icons/arrow_down.svg" />
                    </div>
                </div>
            </div>
            <div className={styles.accordian}>
                <div className={styles.wrap}>
                    <div className={styles.div2}>캡틴 스킬과 리부트 월드에서 생기는 오류 수정</div>
                    <div className={styles.wrap1}>
                        <div className={styles.div3}>2025.03.01</div>
                        <Image className={styles.icon} width={32} height={32} alt="" src="/icons/arrow_down.svg" />
                    </div>
                </div>
            </div>
        </div>
    </div>);
};
export default Notice;
