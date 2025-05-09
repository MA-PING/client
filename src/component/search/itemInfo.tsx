import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/itemInfo.module.css';
import {ItemEquipmentInfo} from "@/interfaces/character";


interface ItemInfoProps {
    ItemInfo?: ItemEquipmentInfo
}

const ItemInfo: NextPage<ItemInfoProps> = ({ItemInfo}) => {
    if (ItemInfo == undefined)
        return (
            <div></div>
        )
    const itemName: string = ItemInfo.item_name;
    const itemSoul: string = ItemInfo.soul_name?.replace(" 소울 적용", "")

    return (
        <div className={styles.itemDetail}>
            <div className={styles.content}>
                    <div className={styles.container}>
                        {parseInt(ItemInfo.starforce) === 0 ? <div/>:
                            <div className={styles.div}>
                            <div className={styles.wrapStarforces}>
                                <div className={styles.wrapStarforce}>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 1 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 2 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 3 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 4 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 5 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                </div>
                                <div className={styles.wrapStarforce}>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 6 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 7 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 8 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 9 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 10 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                </div>
                                <div className={styles.wrapStarforce}>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 11 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 12 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 13 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 14 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 15 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.wrapStarforces}>
                                <div className={styles.wrapStarforce}>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 16 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 17 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 18 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 19 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 20 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                </div>
                                <div className={styles.wrapStarforce}>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 21 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 22 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 23 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 24 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                    <div className={styles.starforce}>
                                        <Image className={styles.starforceChild} width={12} height={12} alt=""
                                               src={parseInt(ItemInfo.starforce) >= 25 ? "/icons/Star_on.svg" : "/icons/Star_off.svg"}/>
                                    </div>
                                </div>
                            </div>
                        </div>}

                        <div className={styles.wrapName}>
                            <div className={styles.div1}>{itemSoul}</div>
                            <div className={styles.wrap}>
                                <div className={styles.wrap1}>
                                    <div className={styles.div2}>{itemName} (+{ItemInfo.scroll_upgrade})</div>
                                </div>
                                {ItemInfo.potential_option_grade !== null ?
                                    <div className={styles.div3}>({ItemInfo.potential_option_grade} 등급)</div> : <div/>
                                }

                            </div>
                        </div>
                        <div className={styles.wrap2}>
                            <Image className={styles.dividerIcon} width={324} height={1} alt="" src="/icons/divider_item.svg" />
                            <div className={styles.itemInfo}>
                                <div className={styles.wrap3}>
                                    <div className={styles.thumbnailItem}>
                                        <Image className={styles.imgHatIcon} width={48} height={48} alt="" src={ItemInfo.item_icon || "/icons/empty/png"}/>
                                    </div>
                                    <div className={styles.reqLev}>REQ LEV : {ItemInfo.item_base_option.base_equipment_level}</div>
                                </div>
                            </div>
                            <Image className={styles.dividerIcon} width={324} height={1} alt="" src="/icons/divider_item.svg" />
                        </div>
                        <div className={styles.wrap}>
                            <div className={styles.str}>장비 분류 : {ItemInfo.item_equipment_slot}</div>
                            {ItemInfo.item_total_option.str !== '0' &&
                                <div className={styles.str}>STR : +{ItemInfo.item_total_option.str}({ItemInfo.item_base_option.str}+{ItemInfo.item_add_option.str}+{ItemInfo.item_etc_option.str}+{ItemInfo.item_starforce_option.str})</div>
                            }
                            {ItemInfo.item_total_option.dex !== '0' &&
                                <div className={styles.str}>DEX : +{ItemInfo.item_total_option.dex}({ItemInfo.item_base_option.dex}+{ItemInfo.item_add_option.dex}+{ItemInfo.item_etc_option.dex}+{ItemInfo.item_starforce_option.dex})</div>
                            }
                            {ItemInfo.item_total_option.dex !== '0' &&
                                <div className={styles.str}>DEX : +{ItemInfo.item_total_option.dex}({ItemInfo.item_base_option.dex}+{ItemInfo.item_add_option.dex}+{ItemInfo.item_etc_option.dex}+{ItemInfo.item_starforce_option.dex})</div>
                            }
                            {ItemInfo.item_total_option.int !== '0' &&
                                <div className={styles.str}>INT : +{ItemInfo.item_total_option.int}({ItemInfo.item_base_option.int}+{ItemInfo.item_add_option.int}+{ItemInfo.item_etc_option.int}+{ItemInfo.item_starforce_option.int})</div>
                            }
                            {ItemInfo.item_total_option.luk !== '0' &&
                                <div className={styles.str}>LUK : +{ItemInfo.item_total_option.luk}({ItemInfo.item_base_option.luk}+{ItemInfo.item_add_option.luk}+{ItemInfo.item_etc_option.luk}+{ItemInfo.item_starforce_option.luk})</div>
                            }
                            {ItemInfo.item_total_option.max_hp !== '0' &&
                                <div className={styles.str}>최대 HP : +{ItemInfo.item_total_option.max_hp}({ItemInfo.item_base_option.max_hp}+{ItemInfo.item_add_option.max_hp}+{ItemInfo.item_etc_option.max_hp}+{ItemInfo.item_starforce_option.max_hp})</div>
                            }
                            {ItemInfo.item_total_option.max_mp !== '0' &&
                                <div className={styles.str}>최대 MP : +{ItemInfo.item_total_option.max_mp}({ItemInfo.item_base_option.max_mp}+{ItemInfo.item_add_option.max_mp}+{ItemInfo.item_etc_option.max_mp}+{ItemInfo.item_starforce_option.max_mp})</div>
                            }
                            {ItemInfo.item_total_option.attack_power !== '0' &&
                                <div className={styles.str}>공격력 : +{ItemInfo.item_total_option.attack_power}({ItemInfo.item_base_option.attack_power}+{ItemInfo.item_add_option.attack_power}+{ItemInfo.item_etc_option.attack_power}+{ItemInfo.item_starforce_option.attack_power})</div>
                            }
                            {ItemInfo.item_total_option.magic_power !== '0' &&
                                <div className={styles.str}>마력 : +{ItemInfo.item_total_option.magic_power}({ItemInfo.item_base_option.magic_power}+{ItemInfo.item_add_option.magic_power}+{ItemInfo.item_etc_option.magic_power}+{ItemInfo.item_starforce_option.magic_power})</div>
                            }
                            {ItemInfo.item_total_option.armor !== '0' &&
                                <div className={styles.str}>방어력 : +{ItemInfo.item_total_option.armor}({ItemInfo.item_base_option.armor}+{ItemInfo.item_add_option.armor}+{ItemInfo.item_etc_option.armor}+{ItemInfo.item_starforce_option.armor})</div>
                            }
                            {ItemInfo.item_total_option.all_stat !== '0' &&
                                <div className={styles.str}>올스탯 : +{ItemInfo.item_total_option.all_stat}({ItemInfo.item_base_option.all_stat}+{ItemInfo.item_add_option.all_stat})</div>
                            }
                            {ItemInfo.item_total_option.damage !== '0' &&
                                <div className={styles.str}>데미지 : +{ItemInfo.item_total_option.damage}({ItemInfo.item_add_option.damage})</div>
                            }
                            {ItemInfo.item_total_option.jump !== '0' &&
                                <div className={styles.str}>점프력 : +{ItemInfo.item_total_option.jump}({ItemInfo.item_base_option.jump}+{ItemInfo.item_add_option.jump}+{ItemInfo.item_etc_option.jump}+{ItemInfo.item_starforce_option.jump})</div>
                            }
                            {ItemInfo.item_total_option.speed !== '0' &&
                                <div className={styles.str}>이동속도 : +{ItemInfo.item_total_option.speed}({ItemInfo.item_base_option.speed}+{ItemInfo.item_add_option.speed}+{ItemInfo.item_etc_option.speed}+{ItemInfo.item_starforce_option.speed})</div>
                            }
                            {ItemInfo.item_total_option.boss_damage !== '0' &&
                                <div className={styles.str}>보스 공격 시 데미지 : +{ItemInfo.item_total_option.boss_damage}({ItemInfo.item_base_option.boss_damage}+{ItemInfo.item_add_option.boss_damage})</div>
                            }
                            {ItemInfo.item_total_option.ignore_monster_armor !== '0' &&
                                <div className={styles.str}>방어력 무시 : +{ItemInfo.item_total_option.ignore_monster_armor}%</div>
                            }
                            <div className={styles.str}>
                                <span>업그레이드 가능 횟수 : {ItemInfo.scroll_upgradeable_count}회</span>
                                <span className={styles.span}> (복구 가능 횟수 : {ItemInfo.scroll_resilience_count}회)</span>
                            </div>
                            <div className={styles.str}>황금망치 제련 {ItemInfo.golden_hammer_flag}</div>
                            <div className={styles.div16}>가위 사용 가능 횟수 : {ItemInfo.cuttable_count}회</div>
                        </div>
                        {ItemInfo.potential_option_grade !== null &&
                            <Image className={styles.dividerIcon} width={324} height={1} alt="" src="/icons/divider_item.svg" />
                        }
                        <div className={styles.wrap}>
                            {ItemInfo.potential_option_grade === '레어' &&
                                <div className={styles.rare}>
                                    <div className={styles.iconGrade}>
                                        <Image className={styles.unionIcon} width={16} height={16} alt="" src="/icons/R.png"/>
                                    </div>
                                    <div className={styles.div18}>잠재옵션</div>
                                </div>}
                            {ItemInfo.potential_option_grade === '에픽' &&
                                <div className={styles.epic}>
                                    <div className={styles.iconGrade}>
                                        <Image className={styles.unionIcon} width={16} height={16} alt="" src="/icons/E.png"/>
                                    </div>
                                    <div className={styles.div18}>잠재옵션</div>
                                </div>
                            }
                            {ItemInfo.potential_option_grade === '유니크' &&
                                <div className={styles.unique}>
                                    <div className={styles.iconGrade}>
                                        <Image className={styles.unionIcon} width={16} height={16} alt="" src="/icons/U.png"/>
                                    </div>
                                    <div className={styles.div18}>잠재옵션</div>
                                </div>}
                            {ItemInfo.potential_option_grade === '레전드리' &&
                                <div className={styles.legendary}>
                                    <div className={styles.iconGrade}>
                                        <Image className={styles.unionIcon} width={16} height={16} alt="" src="/icons/L.png"/>
                                    </div>
                                    <div className={styles.div18}>잠재옵션</div>
                                </div>}

                            {ItemInfo.potential_option_1 !== null &&
                                <div className={styles.str}>{ItemInfo.potential_option_1}</div>
                            }
                            {ItemInfo.potential_option_2 !== null &&
                                <div className={styles.str}>{ItemInfo.potential_option_2}</div>
                            }
                            {ItemInfo.potential_option_3 !== null &&
                                <div className={styles.str}>{ItemInfo.potential_option_3}</div>
                            }
                        </div>
                        {ItemInfo.additional_potential_option_grade !== null &&
                            <Image className={styles.dividerIcon} width={324} height={1} alt="" src="/icons/divider_item.svg" />
                        }
                        <div className={styles.wrap}>
                            {ItemInfo.additional_potential_option_grade === '레어' &&
                                <div className={styles.rare}>
                                    <div className={styles.iconGrade}>
                                        <Image className={styles.unionIcon} width={16} height={16} alt="" src="/icons/R.png"/>
                                    </div>
                                    <div className={styles.div18}>에디셔널옵션</div>
                                </div>}
                            {ItemInfo.additional_potential_option_grade === '에픽' &&
                                <div className={styles.epic}>
                                    <div className={styles.iconGrade}>
                                        <Image className={styles.unionIcon} width={16} height={16} alt="" src="/icons/E.png"/>
                                    </div>
                                    <div className={styles.div18}>에디셔널옵션</div>
                                </div>
                            }
                            {ItemInfo.additional_potential_option_grade === '유니크' &&
                                <div className={styles.unique}>
                                    <div className={styles.iconGrade}>
                                        <Image className={styles.unionIcon} width={16} height={16} alt="" src="/icons/U.png"/>
                                    </div>
                                    <div className={styles.div18}>에디셔널옵션</div>
                                </div>}
                            {ItemInfo.additional_potential_option_grade== '레전드리' &&
                                <div className={styles.legendary}>
                                    <div className={styles.iconGrade}>
                                        <Image className={styles.unionIcon} width={16} height={16} alt="" src="/icons/L.png"/>
                                    </div>
                                    <div className={styles.div18}>에디셔널옵션</div>
                                </div>}
                            {ItemInfo.additional_potential_option_1 !== null &&
                                <div className={styles.str}>{ItemInfo.additional_potential_option_1}</div>
                            }
                            {ItemInfo.additional_potential_option_2 !== null &&
                                <div className={styles.str}>{ItemInfo.additional_potential_option_2}</div>
                            }
                            {ItemInfo.additional_potential_option_3 !== null &&
                                <div className={styles.str}>{ItemInfo.additional_potential_option_3}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>);
};

export default ItemInfo;
