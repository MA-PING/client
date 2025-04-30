import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/characterTotalStat.module.css';
import {FinalStat, Stat} from "@/interfaces/character";


interface TotalStatProps {
    Stat: Stat
}

const TotalStat: NextPage<TotalStatProps> = ({Stat}) => {
    // const finalStat: FinalStat[] = Stat.final_stat;
    // const statName: string[] = ["HP", "MP", "STR", "DEX", "INT", "LUK", "스타포스", "어센틱포스", "재사용 대기시간 미적용", "상태 이상 추가 데미지"];
    // const HP: FinalStat | undefined = finalStat.find(stat => stat.stat_name == "HP");
    // const MP: FinalStat | undefined = finalStat.find(stat => stat.stat_name == "MP");
    return (
        <div className={styles.totalStat}>
            <div className={styles.item}>
                <div className={styles.div}>전투력</div>
                <div className={styles.div1}>999억 9999만 9999</div>
                <div className={styles.icon}>
                    <Image className={styles.iconChild} width={20} height={20} alt=""
                           src="/icons/blue_question_mark.svg"/>
                    {/*<Image className={styles.iconItem} width={2} height={2} alt="" src="Ellipse 3.svg" />*/}
                    {/*<Image className={styles.ellipse4Stroke} width={6} height={8} alt="" src="Ellipse 4 (Stroke).svg" />*/}
                </div>
            </div>
            <div className={styles.wrapPreset}>
                <div className={styles.presetAbility}>
                    <div className={styles.tabSmallVertical}>
                        <div className={styles.tab}>
                            <div className={styles.tabAtomic}>
                                <div className={styles.div}>프리셋 01</div>
                            </div>
                            <div className={styles.tabAtomic1}>
                                <div className={styles.label1}>프리셋 02</div>
                            </div>
                            <div className={styles.tabAtomic1}>
                                <div className={styles.label1}>프리셋 03</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.preset}>
                        <div className={styles.atomic}>
                            <div className={styles.div2}>어빌리티를 입력해 주세요</div>
                        </div>
                        <div className={styles.atomic1}>
                            <div className={styles.div2}>어빌리티를 입력해 주세요</div>
                        </div>
                        <div className={styles.atomic2}>
                            <div className={styles.div2}>어빌리티를 입력해 주세요</div>
                        </div>
                    </div>
                </div>
                <div className={styles.presetAbility}>
                    <div className={styles.tabSmallVertical}>
                        <div className={styles.tab}>
                            <div className={styles.tabAtomic}>
                                <div className={styles.div}>프리셋 01</div>
                            </div>
                            <div className={styles.tabAtomic1}>
                                <div className={styles.label1}>프리셋 02</div>
                            </div>
                            <div className={styles.tabAtomic1}>
                                <div className={styles.label1}>프리셋 03</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.preset1}>
                        <div className={styles.atomic3}>
                            <div className={styles.lv0Wrapper}>
                                <div className={styles.hp}>LV. 0</div>
                            </div>
                            <div className={styles.div5}>하이퍼 스탯을 입력해주세요</div>
                        </div>
                        <div className={styles.atomic3}>
                            <div className={styles.lv0Wrapper}>
                                <div className={styles.hp}>LV. 0</div>
                            </div>
                            <div className={styles.div5}>하이퍼 스탯을 입력해주세요</div>
                        </div>
                        <div className={styles.atomic3}>
                            <div className={styles.lv0Wrapper}>
                                <div className={styles.hp}>LV. 0</div>
                            </div>
                            <div className={styles.div5}>하이퍼 스탯을 입력해주세요</div>
                        </div>
                        <div className={styles.atomic3}>
                            <div className={styles.lv0Wrapper}>
                                <div className={styles.hp}>LV. 0</div>
                            </div>
                            <div className={styles.div5}>하이퍼 스탯을 입력해주세요</div>
                        </div>
                        <div className={styles.atomic3}>
                            <div className={styles.lv0Wrapper}>
                                <div className={styles.hp}>LV. 0</div>
                            </div>
                            <div className={styles.div5}>하이퍼 스탯을 입력해주세요</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.stat}>
                <div className={styles.wrapItem}>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>HP</div>
                            <div className={styles.div10}>99,999</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>MP</div>
                            <div className={styles.div10}>99,999</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>STR</div>
                            <div className={styles.div10}>99,999</div>
                        </div>
                    </div>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>DEX</div>
                            <div className={styles.div10}>99,999</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>INT</div>
                            <div className={styles.div10}>99,999</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>LUK</div>
                            <div className={styles.div10}>99,999</div>
                        </div>
                    </div>
                </div>
                {/*<div className={styles.divider}>*/}
                {/*    <Image className={styles.dividerIcon} width={900} height={1} alt="" src="divider.svg" />*/}
                {/*</div>*/}
                <Image className={styles.dividerIcon1} width={900} height={1} alt="" src="divider.svg"/>
                <div className={styles.wrapItem1}>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>스타포스</div>
                            <div className={styles.div10}>9,999</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>어센틱포스</div>
                            <div className={styles.div10}>9,999</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>재사용 대기시간 미적용</div>
                            <div className={styles.div10}>9999%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>상태 이상 추가 데미지</div>
                            <div className={styles.div10}>100%</div>
                        </div>
                    </div>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>아케인포스</div>
                            <div className={styles.div10}>9,999</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>재사용 대기시간 감소</div>
                            <div className={styles.div10}>0초 0%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>속성 내성 무시</div>
                            <div className={styles.div10}>9,999%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>상태이상 내성</div>
                            <div className={styles.div10}>9,999</div>
                        </div>
                    </div>
                </div>
                <Image className={styles.dividerIcon1} width={900} height={1} alt="" src="divider.svg"/>
                <div className={styles.wrapItem}>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>방어력</div>
                            <div className={styles.div10}>99,999</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>버프 지속시간</div>
                            <div className={styles.div10}>9,999%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>이동속도</div>
                            <div className={styles.div10}>9,999%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>점프력</div>
                            <div className={styles.div10}>999%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>메소 획득량</div>
                            <div className={styles.div10}>9,999%</div>
                        </div>
                    </div>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>추가 경험치 획득</div>
                            <div className={styles.div10}>9,999%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>소환수 지속시간 증가</div>
                            <div className={styles.div10}>9,999%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>무기 숙련도</div>
                            <div className={styles.div10}>99,999</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>스탠스</div>
                            <div className={styles.div10}>100%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>아이템 드롭률</div>
                            <div className={styles.div10}>100%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>공격 속도</div>
                            <div className={styles.div10}>9단계</div>
                        </div>
                    </div>
                </div>
                <Image className={styles.dividerIcon1} width={900} height={1} alt="" src="divider.svg"/>
                <div className={styles.wrapItem3}>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>스탯 공격력</div>
                            <div className={styles.div10}>99만 9999</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>데미지</div>
                            <div className={styles.div10}>9999%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>최종 데미지</div>
                            <div className={styles.div10}>9999%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>보스 몬스터 데미지</div>
                            <div className={styles.div10}>9999%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>일반 몬스터 데미지</div>
                            <div className={styles.div10}>9999%</div>
                        </div>
                    </div>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>공격력</div>
                            <div className={styles.div10}>99,999</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>마력</div>
                            <div className={styles.div10}>99,999</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>방어율 무시</div>
                            <div className={styles.div10}>9999%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>크리티컬 확률</div>
                            <div className={styles.div10}>100%</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>크리티컬 데미지</div>
                            <div className={styles.div10}>9999%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default TotalStat;
