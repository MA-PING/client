"use client";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/login/loginform.module.css";
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import { MenuItem, Select } from "@mui/material";
import {setUserInfo} from "@/redux/userSlice";
import {useDispatch} from "react-redux";
import {fetchMe, login, socialLoginUrl} from "@/utils/authApi";

const Frame: NextPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedDomain, setSelectedDomain] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const domains = [
        { value: "kakao.com", label: "kakao.com" },
        { value: "gmail.com", label: "gmail.com" },
        { value: "naver.com", label: "naver.com" },
        { value: "nate.com", label: "nate.com" },
        { value: "daum.net", label: "daum.net" },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                // 도메인 셀렉트 열림 여부 상태를 제어하려면 추가 상태 관리가 필요함
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogin = async () => {
        if (!email || !selectedDomain || !password) {
            alert("이메일, 도메인, 비밀번호를 모두 입력해주세요!");
            return;
        }

        const completeEmail = `${email}@${selectedDomain}`;

        try {
            await login(completeEmail, password);
            const user = await fetchMe();
            if (user) {
                dispatch(setUserInfo({ userId: user.id, userName: user.nickname, email: user.email }));
            }
            alert("로그인 성공!");
            window.location.href = "/";
        } catch (error) {
            console.error("로그인 에러:", error);
            alert(error instanceof Error ? `로그인 실패: ${error.message}` : "로그인 중 문제가 발생했습니다.");
        }
    };

    // 소셜 로그인 이동 함수
    const handleNaverLogin = () => {
        window.location.href = socialLoginUrl('naver');
    };
    const handleGoogleLogin = () => {
        window.location.href = socialLoginUrl('google');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.div}>
                <div className={styles.title}>
                    <div className={styles.div1}>로그인</div>
                    <div className={styles.div2}>
                        나에게 딱 맞는 메이플 길라잡이 메이핑에 오신 것을 환영해요!
                    </div>
                </div>
                <div className={styles.containerGroup}>
                    <div className={styles.title}>
                        {/* 구글 로그인 버튼 */}
                        <div
                            className={styles.btnSocialLogin}
                            onClick={handleGoogleLogin}
                            style={{ cursor: "pointer" }}
                        >
                            <div className={styles.label}>
                                <div className={styles.wrap}>
                                    <Image src="/icons/sns-google.png" alt="" width={24} height={24} className={styles.icon} />
                                    <div className={styles.googleContainer}>
                                        Google <span className={styles.span}>계정으로 계속하기</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 네이버 로그인 버튼 */}
                        <div
                            className={styles.btnSocialLogin1}
                            onClick={handleNaverLogin}
                            style={{ cursor: "pointer" }}
                        >
                            <div className={styles.label1}>
                                <div className={styles.wrap}>
                                    <Image src="/icons/sns-naver.svg" alt="" width={24} height={24} className={styles.icon} />
                                    <div className={styles.googleContainer}>
                                        Naver <span className={styles.span}>계정으로 계속하기</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.divider}>
                        <Image src="/images/Divider.svg" alt="" width={196} height={1} className={styles.dividerIcon} />
                        <div className={styles.div3}>또는</div>
                        <Image src="/images/Divider.svg" alt="" width={196} height={1} className={styles.dividerIcon} />
                    </div>

                    <div className={styles.container}>
                        <div className={styles.wrapInput}>
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
                                        },
                                        "& input": {
                                            padding: "12px",
                                        },
                                    }}
                                />
                                <div className={styles.div5}>@</div>
                                <Select
                                    value={selectedDomain}
                                    onChange={(e) => setSelectedDomain(e.target.value)}
                                    renderValue={(selected) => selected || "선택하기"}
                                    sx={{
                                        width: "160px",
                                        height: "48px",
                                        fontSize: "14px",
                                        borderRadius: "7px",
                                        "& .MuiSelect-select": {
                                            padding: "12px 16px",
                                            display: "flex",
                                            alignItems: "center",
                                            height: "48px",
                                            borderRadius: "7px",
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                boxShadow: "none",
                                                border: "1px solid rgba(0, 0, 0, 0.2)",
                                                borderRadius: "10px",
                                            },
                                        },
                                    }}
                                >
                                    {domains.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>

                            <div className={styles.textInput2}>
                                <TextField
                                    type="password"
                                    placeholder="비밀번호를 입력해주세요"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{
                                        width: "432px",
                                        "& .MuiOutlinedInput-root": {
                                            height: "48px",
                                            fontSize: "14px",
                                            borderRadius: "7px",
                                        },
                                        "& input": {
                                            padding: "12px",
                                        },
                                    }}
                                />
                            </div>

                            <div className={styles.btnUtil}>
                                <div className={styles.checkbox}>
                                    <Checkbox
                                        sx={{
                                            padding: 0,
                                            marginRight: "8px",
                                            color: "#4060FF",
                                            '&.Mui-checked': {
                                                color: "#4060FF",
                                            },
                                        }}
                                    />
                                    <div className={styles.div3}>로그인 유지하기</div>
                                </div>
                                <div className={styles.button}>
                                    <div className={styles.button1}>비밀번호 찾기</div>
                                    <Image src="/images/loginfollow.svg" alt="" width={16} height={16} className={styles.icon3} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.wrapBtn}>
                            <Button
                                onClick={handleLogin}
                                variant="contained"
                                disabled={!email || !password || !selectedDomain}
                                sx={{
                                    width: "210px",
                                    height: "54px",
                                    fontSize: "18px",
                                    fontFamily: "Pretendard",
                                    fontWeight: 500,
                                    lineHeight: "27px",
                                    backgroundColor: "#4060FF",
                                    borderRadius: "8px",
                                    border: "1px solid #D4D4D6",
                                    boxShadow: "none",
                                    "&:hover": {
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                로그인
                            </Button>
                            {/* 회원가입 버튼을 Link로 감싸기 */}
                            <Link href="/signup" className={styles.button4} style={{ cursor: "pointer" }}>
                                <div className={styles.button1}>회원가입</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Frame;
