import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/characterInfo.module.css';


const Frame:NextPage = () => {
    return (
        <div className={styles.div}>
            <div className={styles.div1}>
                <div className={styles.title}>
                    <div className={styles.div2}>캐릭터 정보</div>
                </div>
                <div className={styles.wrap}>
                    <div className={styles.updateInfo}>
                        <div className={styles.wrapText}>
                            <div className={styles.label}>마지막 업데이트 날짜</div>
                            <div className={styles.div4}>2025.01.01</div>
                        </div>
                        <div className={styles.button}>
                            <div className={styles.button1}>정보 갱신</div>
                        </div>
                    </div>
                    <div className={styles.wrapCharacters}>
                        <div className={styles.character}>
                            <div className={styles.wrapCharacterInfo}>
                                <Image className={styles.characterProfileIcon} width={149} height={149} alt="" src="/images/character-profile.png" />
                                <div className={styles.container}>
                                    <div className={styles.wrapPrimaryInfo}>
                                        <Image className={styles.serverPngIcon} width={20} height={20} alt="" src="/images/server-png.png" />
                                        <div className={styles.button1}>고오스케키</div>
                                    </div>
                                    <div className={styles.wrapSubInfo}>
                                        <div className={styles.lv280}>LV. 280 | 아크메이지(썬,콜)</div>
                                        <div className={styles.div6}>길드: 지존</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.badge}>
                                <div className={styles.label}>본캐</div>
                            </div>
                        </div>
                        <div className={styles.character1}>
                            <div className={styles.wrapCharacterInfo1}>
                                <div className={styles.wrap1}>
                                    <Image className={styles.characterProfileIcon1} width={56} height={56} alt="" src="/images/character-profile.png" />
                                    <div className={styles.badge1}>
                                        <div className={styles.label}>부캐</div>
                                    </div>
                                </div>
                                <div className={styles.container1}>
                                    <div className={styles.wrapPrimaryInfo}>
                                        <Image className={styles.serverPngIcon} width={20} height={20} alt="" src="/images/server-png.png" />
                                        <div className={styles.button1}>칸데르니아</div>
                                    </div>
                                    <div className={styles.wrapSubInfo1}>
                                        <div className={styles.lv2801}>LV. 280 | 아크메이지(썬,콜)</div>
                                        <div className={styles.label}>길드: 지존</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.wrapBtn}>
                                <div className={styles.button2}>
                                    <Image className={styles.icon} width={20} height={20} alt="" src="/icons/change.svg" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.character1}>
                            <div className={styles.wrapCharacterInfo1}>
                                <div className={styles.wrap1}>
                                    <Image className={styles.characterProfileIcon1} width={56} height={56} alt="" src="/images/character-profile.png" />
                                    <div className={styles.badge1}>
                                        <div className={styles.label}>부캐</div>
                                    </div>
                                </div>
                                <div className={styles.container1}>
                                    <div className={styles.wrapPrimaryInfo}>
                                        <Image className={styles.serverPngIcon} width={20} height={20} alt="" src="/images/server-png.png" />
                                        <div className={styles.button1}>칸데르니아</div>
                                    </div>
                                    <div className={styles.wrapSubInfo1}>
                                        <div className={styles.lv2801}>LV. 280 | 아크메이지(썬,콜)</div>
                                        <div className={styles.label}>길드: 지존</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.wrapBtn}>
                                <div className={styles.button2}>
                                    <Image className={styles.icon} width={20} height={20} alt="" src="/icons/change.svg" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.character1}>
                            <div className={styles.wrapCharacterInfo1}>
                                <div className={styles.wrap1}>
                                    <Image className={styles.characterProfileIcon1} width={56} height={56} alt="" src="/images/character-profile.png" />
                                    <div className={styles.badge1}>
                                        <div className={styles.label}>부캐</div>
                                    </div>
                                </div>
                                <div className={styles.container1}>
                                    <div className={styles.wrapPrimaryInfo}>
                                        <Image className={styles.serverPngIcon} width={20} height={20} alt="" src="/images/server-png.png" />
                                        <div className={styles.button1}>칸데르니아</div>
                                    </div>
                                    <div className={styles.wrapSubInfo1}>
                                        <div className={styles.lv2801}>LV. 280 | 아크메이지(썬,콜)</div>
                                        <div className={styles.label}>길드: 지존</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.wrapBtn}>
                                <div className={styles.button2}>
                                    <Image className={styles.icon} width={20} height={20} alt="" src="/icons/change.svg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.div13}>
                <div className={styles.title}>
                    <div className={styles.div2}>상세정보</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.tabMediumHorizontal}>
                        <div className={styles.tab}>
                            <div className={styles.tabAtomic}>
                                <div className={styles.button1}>캐릭터 스탯</div>
                            </div>
                            <div className={styles.tabAtomic1}>
                                <div className={styles.label}>{`장비 `}</div>
                            </div>
                            <div className={styles.tabAtomic1}>
                                <div className={styles.label}>유니온 및 아티펙트</div>
                            </div>
                            <div className={styles.tabAtomic1}>
                                <div className={styles.label}>스킬 및 심볼</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.totalStat}>
                        <div className={styles.wrap4}>
                            <div className={styles.totalStat1}>
                                <div className={styles.item}>
                                    <div className={styles.button1}>전투력</div>
                                    <div className={styles.div16}>999억 9999만 9999</div>
                                    <Image className={styles.icon3} width={24} height={24} alt="" src="icon.svg" />
                                </div>
                                <div className={styles.wrapPreset}>
                                    <div className={styles.presetAbility}>
                                        <div className={styles.tabSmallVertical}>
                                            <div className={styles.tab1}>
                                                <div className={styles.tabAtomic4}>
                                                    <div className={styles.button1}>프리셋 01</div>
                                                </div>
                                                <div className={styles.tabAtomic5}>
                                                    <div className={styles.label}>프리셋 02</div>
                                                </div>
                                                <div className={styles.tabAtomic5}>
                                                    <div className={styles.label}>프리셋 03</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.preset}>
                                            <div className={styles.atomic}>
                                                <div className={styles.div17}>어빌리티를 입력해 주세요</div>
                                            </div>
                                            <div className={styles.atomic1}>
                                                <div className={styles.div17}>어빌리티를 입력해 주세요</div>
                                            </div>
                                            <div className={styles.atomic2}>
                                                <div className={styles.div17}>어빌리티를 입력해 주세요</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.presetAbility}>
                                        <div className={styles.tabSmallVertical}>
                                            <div className={styles.tab1}>
                                                <div className={styles.tabAtomic4}>
                                                    <div className={styles.button1}>프리셋 01</div>
                                                </div>
                                                <div className={styles.tabAtomic5}>
                                                    <div className={styles.label}>프리셋 02</div>
                                                </div>
                                                <div className={styles.tabAtomic5}>
                                                    <div className={styles.label}>프리셋 03</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.preset1}>
                                            <div className={styles.atomic3}>
                                                <div className={styles.lv0Wrapper}>
                                                    <div className={styles.label}>LV. 0</div>
                                                </div>
                                                <div className={styles.div20}>하이퍼 스탯을 입력해주세요</div>
                                            </div>
                                            <div className={styles.atomic3}>
                                                <div className={styles.lv0Wrapper}>
                                                    <div className={styles.label}>LV. 0</div>
                                                </div>
                                                <div className={styles.div20}>하이퍼 스탯을 입력해주세요</div>
                                            </div>
                                            <div className={styles.atomic3}>
                                                <div className={styles.lv0Wrapper}>
                                                    <div className={styles.label}>LV. 0</div>
                                                </div>
                                                <div className={styles.div20}>하이퍼 스탯을 입력해주세요</div>
                                            </div>
                                            <div className={styles.atomic3}>
                                                <div className={styles.lv0Wrapper}>
                                                    <div className={styles.label}>LV. 0</div>
                                                </div>
                                                <div className={styles.div20}>하이퍼 스탯을 입력해주세요</div>
                                            </div>
                                            <div className={styles.atomic3}>
                                                <div className={styles.lv0Wrapper}>
                                                    <div className={styles.label}>LV. 0</div>
                                                </div>
                                                <div className={styles.div20}>하이퍼 스탯을 입력해주세요</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.stat}>
                                    <div className={styles.wrapItem}>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>HP</div>
                                            <div className={styles.div25}>99,999</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>DEX</div>
                                            <div className={styles.div25}>99,999</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>MP</div>
                                            <div className={styles.div25}>99,999</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>INT</div>
                                            <div className={styles.div25}>99,999</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>STR</div>
                                            <div className={styles.div25}>99,999</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>LUK</div>
                                            <div className={styles.div25}>99,999</div>
                                        </div>
                                    </div>
                                    <Image className={styles.dividerIcon} width={727} height={1} alt="" src="Divider.svg" />
                                    <div className={styles.wrapItem1}>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>스타포스</div>
                                            <div className={styles.div25}>9,999</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>아케인포스</div>
                                            <div className={styles.div25}>9,999</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>어센틱포스</div>
                                            <div className={styles.div25}>9,999</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>재사용 대기시간 감소</div>
                                            <div className={styles.div25}>0초 0%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>재사용 대기시간 미적용</div>
                                            <div className={styles.div25}>9999%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>속성 내성 무시</div>
                                            <div className={styles.div25}>9,999%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>상태 이상 추가 데미지</div>
                                            <div className={styles.div25}>100%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>상태이상 내성</div>
                                            <div className={styles.div25}>9,999</div>
                                        </div>
                                    </div>
                                    <Image className={styles.dividerIcon1} width={727} height={1} alt="" src="divider.svg" />
                                    <div className={styles.wrapItem}>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>추가 경험치 획득</div>
                                            <div className={styles.div25}>9,999%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>방어력</div>
                                            <div className={styles.div25}>99,999</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>소환수 지속시간 증가</div>
                                            <div className={styles.div25}>9,999%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>버프 지속시간</div>
                                            <div className={styles.div25}>9,999%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>무기 숙련도</div>
                                            <div className={styles.div25}>99,999</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>이동속도</div>
                                            <div className={styles.div25}>9,999%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>스탠스</div>
                                            <div className={styles.div25}>100%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>점프력</div>
                                            <div className={styles.div25}>999%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>아이템 드롭률</div>
                                            <div className={styles.div25}>100%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>메소 획득량</div>
                                            <div className={styles.div25}>9,999%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>공격 속도</div>
                                            <div className={styles.div25}>9단계</div>
                                        </div>
                                    </div>
                                    <Image className={styles.dividerIcon1} width={727} height={1} alt="" src="divider.svg" />
                                    <div className={styles.wrapItem}>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>스탯 공격력</div>
                                            <div className={styles.div25}>99만 9999</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>공격력</div>
                                            <div className={styles.div25}>99,999</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>데미지</div>
                                            <div className={styles.div25}>9999%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>마력</div>
                                            <div className={styles.div25}>99,999</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>최종 데미지</div>
                                            <div className={styles.div25}>9999%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>방어율 무시</div>
                                            <div className={styles.div25}>9999%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>보스 몬스터 데미지</div>
                                            <div className={styles.div25}>9999%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>크리티컬 확률</div>
                                            <div className={styles.div25}>100%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>일반 몬스터 데미지</div>
                                            <div className={styles.div25}>9999%</div>
                                        </div>
                                        <div className={styles.item1}>
                                            <div className={styles.label}>크리티컬 데미지</div>
                                            <div className={styles.div25}>9999%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default Frame;
