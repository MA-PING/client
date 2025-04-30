import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/characterTotalStat.module.css';
import {Ability, FinalStat, HyperStat, Stat} from "@/interfaces/character";
import {useState} from "react";
import AbilityPreset from "@/component/search/abilityPreset";
import HyperPreset from "@/component/search/hyperStatPreset";


interface TotalStatProps {
    Stat: Stat,
    Ability: Ability,
    HyperStat: HyperStat
}

function formatNumberToKorean(numString: string): string {
    const num: number = parseInt(numString);
    if (num === 0) {
        return "0";
    }

    // 숫자가 0이 아니면서 유효하지 않은 경우 (NaN 등) 처리
    if (isNaN(num)) {
        return "알 수 없음"; // 또는 다른 적절한 메시지
    }

    const units: string[] = ["", "만", "억", "조", "경"]; // 더 큰 단위가 필요하면 추가
    let result = "";
    let unitIndex = 0;
    let number = Math.floor(num); // 소수점 이하 버림

    // 숫자가 음수일 경우 부호를 별도로 처리
    const isNegative = number < 0;
    if (isNegative) {
        number = Math.abs(number);
    }


    while (number > 0) {
        const part = number % 10000; // 만 단위로 자르기
        number = Math.floor(number / 10000);

        if (part > 0) {
            // 현재 단위의 숫자가 0보다 크면 결과에 추가
            // 다음 단위가 있다면 앞에 공백 추가
            const unit = units[unitIndex];
            // 각 단위 숫자가 1000 미만이고 상위 단위가 있는 경우 앞에 0을 붙일지 여부는 필요에 따라 조정 (예: 1억 5백만)
            // 현재 코드에서는 0을 붙이지 않고 그대로 표시합니다 (예: 1억 5백만 -> 1억 500만)
            const partString = part.toString();


            if (result === "") {
                result = partString + unit;
            } else {
                // 단위 사이에 공백을 넣어 구분 (예: 1억 2345만)
                result = partString + unit + " " + result;
            }
        }
        unitIndex++;

        // 정의된 단위를 초과하는 경우 처리 (선택 사항)
        if (unitIndex >= units.length && number > 0) {
            console.warn("Warning: Number exceeds defined units.");
            // 남은 숫자를 그대로 결과 앞에 붙이거나 다른 처리를 할 수 있습니다.
            // 여기서는 경고만 표시하고 루프를 종료합니다.
            break;
        }
    }

    // 음수였을 경우 "-" 부호 추가
    if (isNegative) {
        result = "-" + result;
    }

    // 변환된 문자열이 비어있는 경우 (원본 숫자가 0이 아닌데 변환 과정에서 0으로 처리된 경우 등)
    if (result === "") {
        return "0"; // 또는 원본 숫자를 문자열로 반환
    }


    return result;
}

const TotalStat: NextPage<TotalStatProps> = ({Stat, Ability, HyperStat}) => {
    const [activeAbilityTab, setActiveAbilityTab] = useState<number>(Ability.preset_no);

    const handleAbilityTabClick = (tabName: number) => {
        setActiveAbilityTab(tabName);
    };

    const [activeStatTab, setActiveStatTab] = useState<number>(parseInt(HyperStat.use_preset_no));

    const handleStatTabClick = (tabName: number) => {
        setActiveStatTab(tabName);
    };

    const finalStat: FinalStat[] = Stat.final_stat;
    const finalStatMap = new Map<string, string>();

    finalStat.forEach(stat => {
        finalStatMap.set(stat.stat_name, stat.stat_value);
    });
    return (
        <div className={styles.totalStat}>
            <div className={styles.item}>
                <div className={styles.div}>전투력</div>
                <div className={styles.div1}>{formatNumberToKorean(finalStatMap.get("전투력") as string)}</div>
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
                            <button
                                className={activeAbilityTab === 1 ? styles.tabAtomic : styles.tabAtomic1}
                                onClick={() => handleAbilityTabClick(1)}
                            >
                                <div className={activeAbilityTab === 1 ? styles.div : styles.label1}>프리셋 01</div>
                            </button>
                            <button
                                className={activeAbilityTab === 2 ? styles.tabAtomic : styles.tabAtomic1}
                                onClick={() => handleAbilityTabClick(2)}
                            >
                                <div className={activeAbilityTab === 2 ? styles.div : styles.label1}>프리셋 02</div>
                            </button>
                            <button
                                className={activeAbilityTab === 3 ? styles.tabAtomic : styles.tabAtomic1}
                                onClick={() => handleAbilityTabClick(3)}
                            >
                                <div className={activeAbilityTab === 3 ? styles.div : styles.label1}>프리셋 03</div>
                            </button>
                        </div>
                    </div>
                    {activeAbilityTab === 1 && <AbilityPreset ability={Ability.ability_preset_1.ability_info}/>}
                    {activeAbilityTab === 2 && <AbilityPreset ability={Ability.ability_preset_2.ability_info}/>}
                    {activeAbilityTab === 3 && <AbilityPreset ability={Ability.ability_preset_3.ability_info}/>}
                </div>
                <div className={styles.presetAbility}>
                    <div className={styles.tabSmallVertical}>
                        <div className={styles.tab}>
                            <button
                                className={activeStatTab === 1 ? styles.tabAtomic : styles.tabAtomic1}
                                onClick={() => handleStatTabClick(1)}
                            >
                                <div className={activeStatTab === 1 ? styles.div : styles.label1}>프리셋 01</div>
                            </button>
                            <button
                                className={activeStatTab === 2 ? styles.tabAtomic : styles.tabAtomic1}
                                onClick={() => handleStatTabClick(2)}
                            >
                                <div className={activeStatTab === 2 ? styles.div : styles.label1}>프리셋 02</div>
                            </button>
                            <button
                                className={activeStatTab === 3 ? styles.tabAtomic : styles.tabAtomic1}
                                onClick={() => handleStatTabClick(3)}
                            >
                                <div className={activeStatTab === 3 ? styles.div : styles.label1}>프리셋 03</div>
                            </button>
                        </div>
                    </div>
                    {activeStatTab === 1 && <HyperPreset hyperStat={HyperStat.hyper_stat_preset_1}/>}
                    {activeStatTab === 2 && <HyperPreset hyperStat={HyperStat.hyper_stat_preset_2}/>}
                    {activeStatTab === 3 && <HyperPreset hyperStat={HyperStat.hyper_stat_preset_3}/>}
                </div>
            </div>
            <div className={styles.stat}>
                <div className={styles.wrapItem}>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>HP</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("HP") as string, 10).toLocaleString()}</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>MP</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("MP") as string, 10).toLocaleString()}</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>STR</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("STR") as string, 10).toLocaleString()}</div>
                        </div>
                    </div>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>DEX</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("DEX") as string, 10).toLocaleString()}</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>INT</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("INT") as string, 10).toLocaleString()}</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>LUK</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("LUK") as string, 10).toLocaleString()}</div>
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
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("스타포스") as string, 10).toLocaleString()}</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>어센틱포스</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("어센틱포스") as string, 10).toLocaleString()}</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>재사용 대기시간 미적용</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("재사용 대기시간 미적용") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>상태이상 추가 데미지</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("상태이상 추가 데미지") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                    </div>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>아케인포스</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("아케인포스") as string, 10).toLocaleString()}</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>재사용 대기시간 감소</div>
                            <div
                                className={styles.div10}>{finalStatMap.get("재사용 대기시간 감소 (초)") as string}초 {finalStatMap.get("재사용 대기시간 감소 (%)") as string}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>속성 내성 무시</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("속성 내성 무시") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>상태이상 내성</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("상태이상 내성") as string, 10).toLocaleString()}</div>
                        </div>
                    </div>
                </div>
                <Image className={styles.dividerIcon1} width={900} height={1} alt="" src="divider.svg"/>
                <div className={styles.wrapItem}>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>방어력</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("방어력") as string, 10).toLocaleString()}</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>버프 지속시간</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("버프 지속시간") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>이동속도</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("이동속도") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>점프력</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("점프력") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>메소 획득량</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("메소 획득량") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                    </div>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>추가 경험치 획득</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("추가 경험치 획득") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>소환수 지속시간 증가</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("소환수 지속시간 증가") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>무기 숙련도</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("무기 숙련도") as string, 10).toLocaleString()}</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>스탠스</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("스탠스") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>아이템 드롭률</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("아이템 드롭률") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>공격 속도</div>
                            <div className={styles.div10}>{finalStatMap.get("공격 속도") as string}단계</div>
                        </div>
                    </div>
                </div>
                <Image className={styles.dividerIcon1} width={900} height={1} alt="" src="divider.svg"/>
                <div className={styles.wrapItem3}>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>스탯 공격력</div>
                            <div
                                className={styles.div10}>{formatNumberToKorean(finalStatMap.get("최소 스탯공격력") as string)} {formatNumberToKorean(finalStatMap.get("최대 스탯공격력") as string)}</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>데미지</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("데미지") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>최종 데미지</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("최종 데미지") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>보스 몬스터 데미지</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("보스 몬스터 데미지") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>일반 몬스터 데미지</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("일반 몬스터 데미지") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                    </div>
                    <div className={styles.wrap}>
                        <div className={styles.item1}>
                            <div className={styles.hp}>공격력</div>
                            <div className={styles.div10}>{finalStatMap.get("공격력") as string}</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>마력</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("마력") as string, 10).toLocaleString()}</div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>방어율 무시</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("방어율 무시") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>크리티컬 확률</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("크리티컬 확률") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                        <div className={styles.item1}>
                            <div className={styles.hp}>크리티컬 데미지</div>
                            <div
                                className={styles.div10}>{parseInt(finalStatMap.get("크리티컬 데미지") as string, 10).toLocaleString()}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default TotalStat;
