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
                            <div className={styles.str}>STR : +{ItemInfo.item_total_option.str}({ItemInfo.item_base_option.str}+잠옵+추옵+강화)</div>
                            <div className={styles.str}>DEX : +{ItemInfo.item_total_option.dex}({ItemInfo.item_base_option.dex}+잠옵+추옵+강화)</div>
                            <div className={styles.str}>INT : +{ItemInfo.item_total_option.int}({ItemInfo.item_base_option.int}+잠옵+추옵+강화)</div>
                            <div className={styles.str}>LUK : +{ItemInfo.item_total_option.luk}({ItemInfo.item_base_option.luk}+잠옵+추옵+강화)</div>
                            <div className={styles.str}>최대 HP : +{ItemInfo.item_total_option.max_hp}({ItemInfo.item_base_option.max_hp}+잠옵+추옵+강화)</div>
                            <div className={styles.str}>최대 MP : +{ItemInfo.item_total_option.max_mp}({ItemInfo.item_base_option.max_mp}+잠옵+추옵+강화)</div>
                            <div className={styles.str}>공격력 : +{ItemInfo.item_total_option.attack_power}({ItemInfo.item_base_option.attack_power}+잠옵+추옵+강화)</div>
                            <div className={styles.str}>마력 : +{ItemInfo.item_total_option.magic_power}(기본+잠옵+추옵+강화)</div>
                            <div className={styles.str}>방어력 : +{ItemInfo.item_total_option.armor}({ItemInfo.item_base_option.armor}+잠옵+추옵+강화)</div>
                            <div className={styles.str}>올스탯 : +{ItemInfo.item_total_option.all_stat}({ItemInfo.item_base_option.all_stat}+잠옵+추옵)</div>
                            <div className={styles.str}>데미지 : +{ItemInfo.item_total_option.damage}(기본+잠옵+추옵)</div>
                            <div className={styles.str}>점프력 : +{ItemInfo.item_total_option.jump}({ItemInfo.item_base_option.jump}+추옵)</div>
                            <div className={styles.str}>이동속도 : +{ItemInfo.item_total_option.speed}({ItemInfo.item_base_option.speed}+추옵)</div>
                            <div className={styles.str}>보스 공격 시 데미지 : +{ItemInfo.item_total_option.boss_damage}({ItemInfo.item_base_option.boss_damage}+잠옵+추옵)</div>
                            <div className={styles.str}>방어력 무시 : +{ItemInfo.item_total_option.ignore_monster_armor}%</div>
                            <div className={styles.str}>
                                <span>업그레이드 가능 횟수 : {ItemInfo.scroll_upgradeable_count}회</span>
                                <span className={styles.span}> (복구 가능 횟수 : {ItemInfo.scroll_resilience_count}회)</span>
                            </div>
                            <div className={styles.str}>황금망치 제련 {ItemInfo.golden_hammer_flag}</div>
                            <div className={styles.div16}>가위 사용 가능 횟수 : {ItemInfo.cuttable_count}회</div>
                        </div>
                        <Image className={styles.dividerIcon} width={324} height={1} alt="" src="/icons/divider_item.svg" />
                        <div className={styles.wrap}>
                            <div className={styles.div17}>
                                <div className={styles.iconGrade}>
                                    <Image className={styles.unionIcon} width={14} height={14} alt="" src="/icons/E.png"/>
                                    {/*<Image className={styles.unionIcon1} width={10} height={10} alt="" src="Union.svg"/>*/}
                                    {/*<Image className={styles.eIcon} width={4} height={6} alt="" src="/icons/E.svg"/>*/}
                                    {/*<Image className={styles.unionIcon2} width={12} height={12} alt="" src="Union.svg"/>*/}
                                </div>
                                <div className={styles.div18}>잠재옵션</div>
                            </div>
                            <div className={styles.str}>STR : +총 수치</div>
                            <div className={styles.str}>DEX : +총 수치</div>
                            <div className={styles.str}>INT : +총 수치</div>
                            <div className={styles.str}>LUK : +총 수치</div>
                            <div className={styles.str}>최대 HP : +총 수치</div>
                            <div className={styles.str}>최대 MP : +총 수치</div>
                            <div className={styles.str}>공격력 : +총 수치</div>
                            <div className={styles.str}>마력 : +총 수치</div>
                            <div className={styles.str}>방어력 : +총 수치</div>
                            <div className={styles.str}>올스탯 : +총 수치</div>
                            <div className={styles.str}>데미지 : +총 수치%</div>
                            <div className={styles.str}>점프력 : +총 수치</div>
                            <div className={styles.str}>이동속도 : +총 수치</div>
                            <div className={styles.str}>보스 공격 시 데미지 : +총 수치%</div>
                            <div className={styles.str}>방어력 무시 : +총 수치%</div>
                        </div>
                        <Image className={styles.dividerIcon} width={324} height={1} alt="" src="/icons/divider_item.svg" />
                        <div className={styles.wrap}>
                            <div className={styles.div17}>
                                <div className={styles.iconGrade}>
                                    <Image className={styles.unionIcon} width={14} height={14} alt="" src="/icons/E.png"/>
                                    {/*<Image className={styles.unionIcon1} width={10} height={10} alt="" src="Union.svg"/>*/}
                                    {/*<Image className={styles.eIcon} width={4} height={6} alt="" src="/icons/E.svg"/>*/}
                                    {/*<Image className={styles.unionIcon2} width={12} height={12} alt="" src="Union.svg"/>*/}
                                </div>
                                <div className={styles.div18}>에디셔널옵션</div>
                            </div>
                            <div className={styles.str}>STR : +총 수치</div>
                            <div className={styles.str}>DEX : +총 수치</div>
                            <div className={styles.str}>INT : +총 수치</div>
                            <div className={styles.str}>LUK : +총 수치</div>
                            <div className={styles.str}>최대 HP : +총 수치</div>
                            <div className={styles.str}>최대 MP : +총 수치</div>
                            <div className={styles.str}>공격력 : +총 수치</div>
                            <div className={styles.str}>마력 : +총 수치</div>
                            <div className={styles.str}>방어력 : +총 수치</div>
                            <div className={styles.str}>올스탯 : +총 수치</div>
                            <div className={styles.str}>데미지 : +총 수치%</div>
                            <div className={styles.str}>점프력 : +총 수치</div>
                            <div className={styles.str}>이동속도 : +총 수치</div>
                            <div className={styles.str}>보스 공격 시 데미지 : +총 수치%</div>
                            <div className={styles.str}>방어력 무시 : +총 수치%</div>
                        </div>
                    </div>
                </div>
            </div>);
};

export default ItemInfo;
