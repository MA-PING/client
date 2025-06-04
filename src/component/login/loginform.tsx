"use client";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../../styles/login/loginform.module.css";
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';

import {MenuItem, Select, } from "@mui/material";

const Frame: NextPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, setIsSelectOpen] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState("");
    const [, setFullEmail] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const domains = [
        {
            value: "kakao.com",
            label: "kakao.com",
        },
        {
            value: "gmail.com",
            label: "gmail.com",
        },
        {
            value: "naver.com",
            label: "naver.com",
        },
        {
            value: "nate.com",
            label: "nate.com",
        },
        {
            value: "daum.net",
            label: "daum.net",
        },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsSelectOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogin = () => {
        if (!email || !selectedDomain) {
            alert("이메일과 도메인을 모두 입력해주세요!");
            return;
        }

        const completeEmail = `${email}@${selectedDomain}`;
        setFullEmail(completeEmail);

        console.log("로그인 시도 이메일:", completeEmail);
        console.log("비밀번호:", password);

        // 여기에 로그인 API 요청 로직을 추가할 수 있어요!
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.div}>
                <div className={styles.title}>
                    <div className={styles.div1}>로그인</div>
                    <div className={styles.div2}>
                        나에게 딱 맞는 메이플 길라잡이 메이핑에 오신것을 환영해요!
                    </div>
                </div>
                <div className={styles.containerGroup}>
                    <div className={styles.title}>
                        <div className={styles.btnSocialLogin}>
                            <div className={styles.label}>
                                <div className={styles.wrap}>
                                    <Image
                                        className={styles.icon}
                                        width={24}
                                        height={24}
                                        alt=""
                                        src="/icons/sns-google.png"
                                    />
                                    <div className={styles.googleContainer}>
                                        Google{" "}
                                        <span className={styles.span}>계정으로 계속하기</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.btnSocialLogin1}>
                            <div className={styles.label1}>
                                <div className={styles.wrap}>
                                    <Image
                                        className={styles.icon}
                                        width={24}
                                        height={24}
                                        alt=""
                                        src="/icons/sns-naver.svg"
                                    />
                                    <div className={styles.googleContainer}>
                                        Naver <span className={styles.span}>계정으로 계속하기</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.divider}>
                        <Image
                            className={styles.dividerIcon}
                            width={196}
                            height={1}
                            alt=""
                            src="/images/Divider.svg"
                        />
                        <div className={styles.div3}>또는</div>
                        <Image
                            className={styles.dividerIcon}
                            width={196}
                            height={1}
                            alt=""
                            src="/images/Divider.svg"
                        />
                    </div>

                    <div className={styles.container}>
                        <div className={styles.wrapInput}>
                            <div className={styles.input}>
                                <TextField
                                    id="outlined-basic"
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
                                {/* <div className={styles.textInput1}>
									<input
										type="text"
										placeholder="ex-Maping123"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className={styles.inputField}
									/>
								</div> */}
                                <div className={styles.div5}>@</div>
                                <Select
                                    value={selectedDomain}
                                    onChange={(e) => setSelectedDomain(e.target.value as string)}
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
                                                boxShadow: "none", // drop-shadow 제거
                                                border: "1px solid rgba(0, 0, 0, 0.2)", // 드롭다운 테두리 적용
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
                                <div className={styles.textInput1}>
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
                            </div>

                            <div className={styles.btnUtil}>
                                <div className={styles.checkbox}>

                                    <div className={styles.checkboxItem}>
                                        <Checkbox
                                            defaultChecked={false}
                                            sx={{
                                                padding: 0,
                                                marginRight: "8px",
                                                color: "#4060FF",
                                                '&.Mui-checked': {
                                                    color: "#4060FF",
                                                },
                                            }}
                                        />

                                    </div>
                                    <div className={styles.div3}>로그인 유지하기</div>
                                </div>
                                <div className={styles.button}>
                                    <div className={styles.button1}>비밀번호 찾기</div>
                                    <Image
                                        className={styles.icon3}
                                        width={16}
                                        height={16}
                                        alt=""
                                        src="/images/loginfollow.svg"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.wrapBtn}>
                                {/* {email && password && selectedDomain ? (
									<div className={styles.button1}>로그인</div>
								) : (
									<div className={styles.button1} style={{ opacity: 0.5 }}>
										안돼
									</div>
								)} */}
                                {/* <div className={styles.button1}>로그인</div> */}
                                <Button
                                    onClick={handleLogin}
                                    variant="contained"
                                    sx={{
                                        width: "210px",
                                        height: "54px",
                                        fontSize: "18px",
                                        fontFamily: "Pretendard",
                                        fontWeight: 500,
                                        lineHeight: "27px",
                                        wordWrap: "break-word",
                                        backgroundColor: email && password && selectedDomain ? "#4060FF" : "#ccc",
                                        color: email && password && selectedDomain ? "#fff" : "rgba(14, 15, 20, 0.20)",
                                        borderRadius: "8px",
                                        border: "1px solid #D4D4D6",
                                        boxShadow: "none", // 기본 그림자 제거
                                        "&:hover": {
                                            boxShadow: "none", // hover 시 그림자 제거
                                        },
                                        "&:focus": {
                                            boxShadow: "none", // focus 시 그림자 제거
                                        },
                                    }}
                                >
                                    로그인
                                </Button>
                            <div className={styles.button4}>
                                <div className={styles.button1}>회원가입</div>
                            </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Frame;
