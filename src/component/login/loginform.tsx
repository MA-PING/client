import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../../styles/login/loginform.module.css';


const Frame:NextPage = () => {
    return (
        <div className={styles.div}>
            <div className={styles.title}>
                <div className={styles.div1}>로그인</div>
                <div className={styles.div2}>나에게 딱 맞는 메이플 길라잡이 메이핑에 오신것을 환영해요!</div>
            </div>
            <div className={styles.containerGroup}>
                <div className={styles.wrapButton}>
                    <div className={styles.btnSocialLogin}>
                        <div className={styles.label}>
                            <div className={styles.wrap}>
                                <Image className={styles.icon} width={24} height={24} alt="" src="/icons/sns-google.png" />
                                <div className={styles.googleContainer}>{`Google `}
                                    <span className={styles.span}>계정으로 계속하기</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.btnSocialLogin1}>
                        <div className={styles.label1}>
                            <div className={styles.wrap1}>
                                <Image className={styles.icon} width={24} height={24} alt="" src="/icons/sns-naver.svg" />
                                <div className={styles.googleContainer}>{`Naver `}
                                    <span className={styles.span}>계정으로 계속하기</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.divider}>
                    <Image className={styles.dividerIcon} width={196} height={1} alt="" src="/images/Divider.svg" />
                    <div className={styles.div3}>또는</div>
                    <Image className={styles.dividerIcon} width={196} height={1} alt="" src="/images/Divider.svg" />
                </div>
                <div className={styles.container}>
                    <div className={styles.wrapInput}>
                        <div className={styles.wrapInput}>
                            <div className={styles.input}>
                                <div className={styles.textInput}>
                                    <div className={styles.textInput1}>
                                        <div className={styles.div4}>ex-Maping123</div>
                                    </div>
                                </div>
                                <div className={styles.div5}>@</div>
                                <div className={styles.select}>
                                    <div className={styles.div6}>선택하기</div>
                                    <Image className={styles.icon2} width={20} height={20} alt="" src="/images/loginselect.svg" />
                                </div>
                            </div>
                            <div className={styles.textInput2}>
                                <div className={styles.textInput1}>
                                    <div className={styles.div7}>비밀번호를 입력해주세요</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.btnUtil}>
                            <div className={styles.checkbox}>
                                <div className={styles.checkboxItem}>
                                    <Image className={styles.icon3} width={16} height={16} alt="" src="/images/loginselect2.svg" />
                                </div>
                                <div className={styles.div3}>로그인 유지하기</div>
                            </div>
                            <div className={styles.button}>
                                <div className={styles.button1}>비밀번호 찾기</div>
                                <Image className={styles.icon3} width={16} height={16} alt="" src="/images/loginfollow.svg" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.wrapBtn}>
                        <div className={styles.button2}>
                            <div className={styles.button1}>로그인</div>
                        </div>
                        <div className={styles.button4}>
                            <div className={styles.button1}>회원가입</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default Frame;
