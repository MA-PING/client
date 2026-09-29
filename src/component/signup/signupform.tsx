"use client";
import { FunctionComponent, useState } from 'react';
import styles from '../../styles/signup/signupform.module.css';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MenuItem, Select } from "@mui/material";
import { sendEmailVerification } from "@/utils/authApi";

const Component1: FunctionComponent = () => {
    const [email, setEmail] = useState('');
    const [domain, setDomain] = useState('');
    const [initialEmailSent, setInitialEmailSent] = useState(false);

    const callSendEmailAPI = async () => {
        const fullEmail = `${email}@${domain}`;

        try {
            await sendEmailVerification(fullEmail);
            alert("인증번호가 성공적으로 발송되었습니다.");
            return true;
        } catch (error) {
            console.error("메일 발송 API 호출 오류:", error);
            alert(error instanceof Error ? error.message : "메일 발송 중 오류가 발생했습니다.");
            return false;
        }
    };

    const handleSendEmail = async () => {
        const isSuccess = await callSendEmailAPI();
        if (isSuccess) {
            setInitialEmailSent(true);
        }
    };

    const handleResendEmail = async () => {
        await callSendEmailAPI();
    };

    return (
        <div className={styles.div}>
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
                    <div className={styles.div2}>API Key 등록</div>
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
                            <TextField
                                placeholder="ex-Maping123"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    width: "295px",
                                    "& .MuiOutlinedInput-root": {
                                        height: "48px",
                                        fontSize: "14px",
                                        borderRadius: "7px",
                                        fontFamily: "Pretendard, sans-serif",
                                    },
                                    "& input": {
                                        padding: "12px",
                                    },
                                }}
                            />
                            <div className={styles.div8}>@</div>
                            <Select
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                displayEmpty
                                sx={{
                                    width: "120px",
                                    height: "48px",
                                    fontSize: "14px",
                                    fontFamily: "Pretendard, sans-serif",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderRadius: "7px",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "7px",
                                    },
                                }}
                                inputProps={{ 'aria-label': '도메인 선택' }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            boxShadow: "none",
                                            border: "1px solid rgba(0, 0, 0, 0.2)",
                                            borderRadius: "10px",
                                            fontFamily: "Pretendard, sans-serif",
                                        },
                                    },
                                }}
                            >
                                <MenuItem
                                    value=""
                                    sx={{ fontFamily: "Pretendard, sans-serif" }}
                                >
                                    <em>선택하기</em>
                                </MenuItem>
                                <MenuItem value="gmail.com">gmail.com</MenuItem>
                                <MenuItem value="naver.com">naver.com</MenuItem>
                                <MenuItem value="daum.net">daum.net</MenuItem>
                            </Select>
                        </div>

                        <div className={styles.wrapButton}>
                            <Button
                                className={styles.button}
                                variant="contained"
                                disabled={!email || !domain}
                                onClick={handleSendEmail}
                                sx={{
                                    borderRadius: '7px',
                                    backgroundColor: "#4060FF",
                                    boxShadow: "none",
                                    "&:hover": {
                                        backgroundColor: "#4060FF",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                인증 메일 보내기
                            </Button>
                            <Button
                                className={styles.button2}
                                variant="text"
                                onClick={handleResendEmail}
                                disabled={!initialEmailSent}
                                sx={{
                                    color: initialEmailSent ? 'black' : 'grey',
                                    border: 'none',
                                    '&:hover': {
                                        border: 'none',
                                        backgroundColor: 'transparent'
                                    }
                                }}
                            >
                                다시 보내기
                            </Button>
                        </div>
                    </div>

                    <div className={styles.divider}>
                        <div className={styles.divider1}>
                            <img className={styles.dividerIcon} alt="" src="/icons/divider.svg" />
                        </div>
                        <div className={styles.div10}>또는</div>
                        <div className={styles.divider1}>
                            <img className={styles.dividerIcon} alt="" src="/icons/divider.svg" />
                        </div>
                    </div>

                    <div className={styles.wrapButton1}>
                        <div className={styles.btnSocialLogin}>
                            <div className={styles.label}>
                                <div className={styles.wrap}>
                                    <div className={styles.icon1}>
                                        <img className={styles.iconChild} alt="" src="/icons/sns-google.png" />
                                    </div>
                                    <div className={styles.googleContainer}>
                                        Google <span className={styles.span}>계정으로 계속하기</span>
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
                                    <div className={styles.googleContainer}>
                                        Naver <span className={styles.span}>계정으로 계속하기</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Component1;