import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/item.module.css';
import type {ItemEquipment, ItemEquipmentInfo, AndroidEquipment, ItemEquipmentTitle} from "@/interfaces/character";
import {useState} from "react";
import ItemInfo from "@/component/search/itemInfo";
import TitleInfo from "@/component/search/titleInfo";
import AndroidInfo from "@/component/search/androidInfo";


interface WrapEquipmentProps {
    item: ItemEquipment
    android: AndroidEquipment
}

const WrapEquipment: NextPage<WrapEquipmentProps> = ({item, android}) => {
    const item_equipment: ItemEquipmentInfo[] = item.item_equipment;
    const title: ItemEquipmentTitle = item.title;
    const itemIconMap = new Map<string, string>();
    for (const item of item_equipment) {
        itemIconMap.set(item.item_equipment_slot, item.item_icon);
    }

    const [activeItemTab, setActiveItemTab] = useState<string>("0");

    const handleItemTabClick = (tabName: string) => {
        setActiveItemTab(tabName);
    };
    return (
        <div className={styles.wrapEquipment}>
            <div className={styles.equipment}>
                <div className={styles.wrapItem}>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("반지1") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("반지1")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("반지1") || "/icons/empty.png"}
                                alt={"반지1"}
                            />
                        ) : (
                            <div className={styles.label4}>반지 01</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("반지2") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("반지2")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("반지2") || "/icons/empty.png"}
                                alt={"반지2"}
                            />
                        ) : (
                            <div className={styles.label4}>반지 02</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("반지3") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("반지3")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("반지3") || "/icons/empty.png"}
                                alt={"반지3"}
                            />
                        ) : (
                            <div className={styles.label4}>반지 03</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("반지4") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("반지4")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("반지4") || "/icons/empty.png"}
                                alt={"반지4"}
                            />
                        ) : (
                            <div className={styles.label4}>반지 04</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("포켓 아이템") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("포켓 아이템")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("포켓 아이템") || "/icons/empty.png"}
                                alt={"포켓 아이템"}
                            />
                        ) : (
                            <div className={styles.label4}>포켓 아이템</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {title && title.title_name !== undefined ?
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("칭호")}
                                width={48}
                                height={48}
                                src={title.title_icon || "/icons/empty.png"}
                                alt={"칭호"}
                            /> :
                            <div className={styles.label4}>칭호</div>
                        }
                    </div>
                </div>
                <div className={styles.wrapItem1}>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("펜던트") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("펜던트")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("펜던트") || "/icons/empty.png"}
                                alt={"펜던트"}
                            />
                        ) : (
                            <div className={styles.label4}>펜던트</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("펜던트2") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("펜던트2")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("펜던트2") || "/icons/empty.png"}
                                alt={"펜던트2"}
                            />
                        ) : (
                            <div className={styles.label4}>펜던트2</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("무기") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("무기")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("무기") || "/icons/empty.png"}
                                alt={"무기"}
                            />
                        ) : (
                            <div className={styles.label4}>무기</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("벨트") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("벨트")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("벨트") || "/icons/empty.png"}
                                alt={"벨트"}
                            />
                        ) : (
                            <div className={styles.label4}>벨트</div>
                        )}
                    </div>
                </div>
                <div className={styles.wrapItem2}>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("모자") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("모자")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("모자") || "/icons/empty.png"}
                                alt={"모자"}
                            />
                        ) : (
                            <div className={styles.label4}>모자</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("얼굴장식") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("얼굴장식")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("얼굴장식") || "/icons/empty.png"}
                                alt={"얼굴장식"}
                            />
                        ) : (
                            <div className={styles.label4}>얼굴장식</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("눈장식") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("눈장식")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("눈장식") || "/icons/empty.png"}
                                alt={"눈장식"}
                            />
                        ) : (
                            <div className={styles.label4}>눈장식</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("상의") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("상의")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("상의") || "/icons/empty.png"}
                                alt={"상의"}
                            />
                        ) : (
                            <div className={styles.label4}>상의</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("하의") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("하의")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("하의") || "/icons/empty.png"}
                                alt={"하의"}
                            />
                        ) : (
                            <div className={styles.label4}>하의</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("신발") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("신발")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("신발") || "/icons/empty.png"}
                                alt={"신발"}
                            />
                        ) : (
                            <div className={styles.label4}>신발</div>
                        )}
                    </div>
                </div>
                <div className={styles.wrapItem3}>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("귀고리") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("귀고리")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("귀고리") || "/icons/empty.png"}
                                alt={"귀고리"}
                            />
                        ) : (
                            <div className={styles.label4}>귀고리</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("어깨장식") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("어깨장식")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("어깨장식") || "/icons/empty.png"}
                                alt={"어깨장식"}
                            />
                        ) : (
                            <div className={styles.label4}>어깨장식</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("장갑") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("장갑")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("장갑") || "/icons/empty.png"}
                                alt={"장갑"}
                            />
                        ) : (
                            <div className={styles.label4}>장갑</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {android != undefined ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("안드로이드")}
                                width={48}
                                height={48}
                                src={android.android_icon || "/icons/empty.png"}
                                alt={"안드로이드"}
                            />
                        ) : (
                            <div className={styles.label4}>안드로이드</div>
                        )}
                    </div>
                </div>
                <div className={styles.wrapItem4}>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("엠블렘") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("엠블렘")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("엠블렘") || "/icons/empty.png"}
                                alt={"엠블렘"}
                            />
                        ) : (
                            <div className={styles.label4}>엠블렘</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("뱃지") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("뱃지")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("뱃지") || "/icons/empty.png"}
                                alt={"뱃지"}
                            />
                        ) : (
                            <div className={styles.label4}>뱃지</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("훈장") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("훈장")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("훈장") || "/icons/empty.png"}
                                alt={"훈장"}
                            />
                        ) : (
                            <div className={styles.label4}>훈장</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("보조무기") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("보조무기")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("보조무기") || "/icons/empty.png"}
                                alt={"보조무기"}
                            />
                        ) : (
                            <div className={styles.label4}>보조무기</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("망토") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("망토")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("망토") || "/icons/empty.png"}
                                alt={"망토"}
                            />
                        ) : (
                            <div className={styles.label4}>망토</div>
                        )}
                    </div>
                    <div className={styles.equipmentAtomic}>
                        {itemIconMap.get("기계 심장") != null ? (
                            <Image
                                className={styles.imgRing01}
                                onClick={() => handleItemTabClick("기계 심장")}
                                width={48}
                                height={48}
                                src={itemIconMap.get("기계 심장") || "/icons/empty.png"}
                                alt={"기계 심장"}
                            />
                        ) : (
                            <div className={styles.label4}>기계 심장</div>
                        )}
                    </div>
                </div>
            </div>

                {activeItemTab === "0" &&
                    <div className={styles.itemDetail}>
                        <div className={styles.noImg}>
                            <div className={styles.noImgChild}/>
                            <Image className={styles.noImgItem} width={68} height={42} alt="" src="/icons/Rectangle 12519.svg"/>
                        </div>
                        <div className={styles.div}>
                            <p className={styles.p}>아이템을 클릭하면</p>
                            <p className={styles.p}>상세정보를 볼 수 있어요!</p>
                        </div>
                    </div>
                }
                {activeItemTab !== "0" && activeItemTab !== "칭호" &&
                    <ItemInfo ItemInfo={item_equipment.filter(item => item.item_equipment_slot == activeItemTab)[0]}/>
                }
                {activeItemTab !== "0" && activeItemTab === "칭호" &&
                    <TitleInfo titleInfo={title}/>
                }
                {activeItemTab !== "0" && activeItemTab === "안드로이드" &&
                    <AndroidInfo androidInfo={android}/>
                }
            </div>);
};

export default WrapEquipment;
