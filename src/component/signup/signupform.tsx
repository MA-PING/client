"use client";
import { FunctionComponent, useState } from 'react'; // useEffect는 이제 필요 없으므로 제거
import styles from '../../styles/signup/signupform.module.css';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MenuItem, Select } from "@mui/material";

const Component1: FunctionComponent = () => {
    const [email, setEmail] = useState('');
    const [domain, setDomain] = useState('');

    // --- 👇 로직을 매우 단순하게 수정 ---
    // 첫 이메일이 발송되었는지 여부만 추적하는 상태
    const [initialEmailSent, setInitialEmailSent] = useState(false);

    // "인증 메일 보내기" 버튼 클릭 핸들러
    const handleSendEmail = () => {
        console.log(`Sending verification to ${email}@${domain}`);
        // 첫 이메일이 발송되었음을 상태에 기록
        setInitialEmailSent(true);
    };

    // "다시 보내기" 버튼 클릭 핸들러
    const handleResendEmail = () => {
        // 실제 다시 보내기 API 호출 로직을 여기에 추가
        console.log(`Resending verification to ${email}@${domain}`);
    };
    // --- 👆 ---

    return (
        <div className={styles.div}>
            <div className={styles.stepIndicator}>
                {/* Step indicator UI */}
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

                            {/* 👇 '다시 보내기' 버튼의 최종 로직 */}
                            <Button
                                className={styles.button2}
                                variant="text" // 테두리가 없는 'text' variant가 더 적합할 수 있습니다.
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