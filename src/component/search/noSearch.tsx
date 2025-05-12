import type { NextPage } from 'next';
import Image from "next/image";
import styles from '@/styles/search/noSearch.module.css';
import Form from "next/form";


const NoSearch:NextPage = () => {
    return (
        <div className={styles.apiX}>
            <div className={styles.wrapSearchj}>
                <div className={styles.apiKey}>API Key를 입력하지 않아도 찾으시는 캐릭터를 검색할 수 있어요.</div>
                <Form className={styles.search} action="/character/">
                    <div className={styles.icon}>
                        <Image className={styles.iconChild} fill alt="" src="/icons/Group 1.svg" />
                    </div>
                    {/*<div className={styles.div}>내용을 입력해주세요</div>*/}
                    <input className={styles.div} type="text" placeholder="내용을 입력해주세요"/>
                </Form>
            </div>
            <div className={styles.divider}>
                <Image className={styles.dividerIcon} width={215} height={1} alt="" src="/icons/divider_item.svg" />
                <div className={styles.div1}>또는</div>
                <Image className={styles.dividerIcon} width={215} height={1} alt="" src="/icons/divider_item.svg" />
            </div>
            <div className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.wrapTitle}>
                        <div className={styles.title}>
                            <div className={styles.icon1}>
                                <Image className={styles.iconItem} width={32} height={32} alt="" src="/icons/blue_mark.svg" />
                            </div>
                            <div className={styles.apiKey1}>API Key 인증 필요</div>
                        </div>
                        <div className={styles.apiContainer}>
                            <p className={styles.api}>내 캐릭터 정보를 보려면 API 인증이 필요해요.</p>
                            <p className={styles.api}>API를 등록하면 다음과 같은 이점이 있어요.</p>
                        </div>
                    </div>
                    <div className={styles.wrapInfo}>
                        <div className={styles.ai}>✅ 내 캐릭터 정보가 자동으로 표시돼요</div>
                        <div className={styles.div3}>✅ 매 번 검색할 필요없이 쉽게  정보를 확인할 수 있어요</div>
                        <div className={styles.ai}>✅ 메이 AI가 본캐에 딱 맞는 육성 팁을 알려줘요</div>
                    </div>
                </div>
                <div className={styles.container1}>
                    <div className={styles.container}>
                        <div className={styles.textInput}>
                            <div className={styles.textInput1}>
                                <div className={styles.div}>API Key를 입력해주세요</div>
                                <div className={styles.wrapIcon} />
                            </div>
                        </div>
                        <div className={styles.wrapBtn}>
                            <div className={styles.button}>
                                <div className={styles.button1}>입력하기</div>
                            </div>
                            <div className={styles.button2}>
                                <div className={styles.button1}>API Key 가이드</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default NoSearch;
