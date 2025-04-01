import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/notice.module.css';


const NOTICE:NextPage = () => {
    return (
        <div className={styles.ai}>
            <div className={styles.notes}>
                <div className={styles.div}>메이플스토리 패치 노트 요약</div>
                <div className={styles.div1}>1.2.395(5) 업데이트</div>
            </div>
            <div className={styles.wrapAccordian}>
                <div className={styles.accordian}>
                    <div className={styles.wrap}>
                        <div className={styles.div2}>캡틴 스킬과 리부트 월드에서 생기는 오류 수정</div>
                        <div className={styles.wrap1}>
                            <div className={styles.sDContainer}>2025.03.01</div>
                            <Image className={styles.icon} width={32} height={32} alt="" src="/icons/arrow_down.svg" />
                        </div>
                    </div>
                </div>
                <div className={styles.accordian1}>
                    <div className={styles.wrap}>
                        <div className={styles.div2}>캡틴 스킬과 리부트 월드에서 생기는 오류 수정</div>
                        <div className={styles.wrap1}>
                            <div className={styles.sDContainer}>2025.03.01</div>
                            <Image className={styles.icon} width={32} height={32} alt="" src="/icons/arrow_down.svg" />
                        </div>
                    </div>
                </div>
                <div className={styles.accordian2}>
                    <div className={styles.content}>
                        <div className={styles.wrap4}>
                            <div className={styles.div2}>캡틴 스킬과 리부트 월드에서 생기는 오류 수정</div>
                            <div className={styles.wrap1}>
                                <div className={styles.sDContainer}>2025.03.01</div>
                                <Image className={styles.icon} width={32} height={32} alt="" src="/icons/arrow_down.svg" />
                            </div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.sDContainer}>
                                <ul className={styles.sDI}>
                                    <li className={styles.li}>캡틴의 사인 오브 봄바드가 자동 사용 모드일 때 가끔 어색한 위치에 생성되는 현상이 수정됩니다.</li>
                                    <li className={styles.li}>리부트 월드에서 아래 스킬에 일부 주문서 강화 효과가 적용되는 현상이 수정됩니다.</li>
                                    <li className={styles.li}>웨폰퍼프 - S링</li>
                                    <li className={styles.li}>웨폰퍼프 - D링</li>
                                    <li className={styles.li}>웨폰퍼프 - I링</li>
                                    <li className={styles.li}>웨폰퍼프 - L링</li>
                                    <li className={styles.li}>매직 서킷</li>
                                    <li className={styles.li}>그란디스 여신의 축복</li>
                                    <li className={styles.li}>리부트 월드에서 아래 에디셔널 잠재능력이 적용되는 현상이 수정됩니다.</li>
                                    <li className={styles.li}>HP 회복 아이템 및 회복 스킬 효율 증가</li>
                                    <li>공격 시 일정 확률로 HP/MP 회복</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default NOTICE;
