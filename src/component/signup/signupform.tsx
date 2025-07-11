import { FunctionComponent } from 'react';
import styles from '../../styles/signup/signupform.module.css';


const Component1:FunctionComponent = () => {
    return (
        <div className={styles.div} style={{ marginTop: "104px" }}>
            <div className={styles.stepIndicator}>
                <div className={styles.stepIndicatorAtomic}>
                    <div className={styles.wrapItem}>
                        <img className={styles.itemOngoingIcon} alt="" src="/icons/union/id.svg" />
                        <img className={styles.wrapItemChild} alt="" src="/icons/Vector%204.svg" />
                    </div>
                    <div className={styles.div1}>아이디 생성</div>
                </div>
                <div className={styles.stepIndicatorAtomic1}>
                    <div className={styles.wrapItem}>
                        <div className={styles.itemBefore} />
                        <img className={styles.wrapItemChild} alt="" src="/icons/Vector%204.svg" />
                    </div>
                    <div className={styles.div2}>비밀번호 생성</div>
                </div>
                <div className={styles.stepIndicatorAtomic1}>
                    <div className={styles.wrapItem}>
                        <div className={styles.itemBefore} />
                        <img className={styles.wrapItemChild} alt="" src="/icons/Vector%204.svg" />
                    </div>
                    <div className={styles.div2}>닉네임 생성</div>
                </div>
                <div className={styles.stepIndicatorAtomic1}>
                    <div className={styles.wrapItem}>
                        <div className={styles.itemBefore} />
                    </div>
                    <div className={styles.div2}> API Key 등록</div>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.title}>
                    <div className={styles.div5}>아이디 생성</div>
                    <div className={styles.div6}>가입을 완료하고 나만을 위한 맞춤 정보를 받아보세요.</div>
                </div>
                <div className={styles.containerGroup}>
                    <div className={styles.container}>
                        <div className={styles.input}>
                            <div className={styles.textInput}>
                                <div className={styles.textInput1}>
                                    <div className={styles.div7}>ex) Mapping</div>
                                    <div className={styles.wrapIcon} />
                                </div>
                            </div>
                            <div className={styles.div8}>@</div>
                            <div className={styles.select}>
                                <div className={styles.div9}>선택하기</div>
                                <img className={styles.icon} alt="" src="/icons/arrow_down.svg" />
                            </div>
                        </div>
                        <div className={styles.wrapButton}>
                            <div className={styles.button}>
                                <div className={styles.button1}>인증 메일 보내기</div>
                            </div>
                            <div className={styles.button2}>
                                <div className={styles.button1}>다시 보내기</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.divider}>
                        <div className={styles.divider1}>
                            <img className={styles.dividerIcon} alt="" src="divider.svg" />
                        </div>
                        <div className={styles.div10}>또는</div>
                        <div className={styles.divider1}>
                            <img className={styles.dividerIcon} alt="" src="divider.svg" />
                        </div>
                    </div>
                    <div className={styles.wrapButton1}>
                        <div className={styles.btnSocialLogin}>
                            <div className={styles.label}>
                                <div className={styles.wrap}>
                                    <div className={styles.icon1}>
                                        <img className={styles.iconChild} alt="" src="/icons/sns-google.png" />
                                    </div>
                                    <div className={styles.googleContainer}>{`Google `}
                                        <span className={styles.span}>계정으로 계속하기</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.btnSocialLogin1}>
                            <div className={styles.label1}>
                                <div className={styles.wrap}>
                                    <div className={styles.icon1}>
                                        <img className={styles.image1Icon} alt="" src="/icons/sns-naver.svg" />
                                    </div>
                                    <div className={styles.googleContainer}>{`Naver `}
                                        <span className={styles.span}>계정으로 계속하기</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default Component1;
