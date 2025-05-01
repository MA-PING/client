import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/item.module.css';
import {ItemEquipment, ItemEquipmentInfo} from "@/interfaces/character";


interface WrapEquipmentProps {
    Item: ItemEquipment
}

const WrapEquipment: NextPage<WrapEquipmentProps> = ({Item}) => {

    const item_equipment: ItemEquipmentInfo[] = Item.item_equipment;
    console.log("item:" + item_equipment)
    return (
        <div className={styles.wrapEquipment}>
            <div className={styles.equipment}>
                <div className={styles.wrapItem}>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label}>반지 01</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label1}>반지 02</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label2}>반지 03</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label2}>반지 04</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label4}>포켓 아이템</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label5}>칭호</div>
                    </div>
                </div>
                <div className={styles.wrapItem1}>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label6}>펜던트 01</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label7}>펜던트 02</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label5}>{`무기 `}</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label5}>벨트</div>
                    </div>
                </div>
                <div className={styles.wrapItem2}>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label5}>모자</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label11}>얼굴장식</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label12}>눈장식</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label5}>상의</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label5}>하의</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label5}>신발</div>
                    </div>
                </div>
                <div className={styles.wrapItem3}>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label12}>귀고리</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label11}>어깨장식</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label5}>장갑</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label19}>안드로이드</div>
                    </div>
                </div>
                <div className={styles.wrapItem4}>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label12}>엠블램</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label5}>뱃지</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label5}>훈장</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label11}>보조무기</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label5}>망토</div>
                    </div>
                    <div className={styles.equipmentAtomic}>
                        <div className={styles.imgRing01}/>
                        <div className={styles.label11}>기계심장</div>
                    </div>
                </div>
            </div>
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
        </div>);
};

export default WrapEquipment;
