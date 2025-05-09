import type {NextPage} from 'next';
import Image from "next/image";
import styles from '@/styles/search/androidInfo.module.css';
import {ItemEquipmentTitle} from "@/interfaces/character";


interface TitleInfoProps {
    titleInfo: ItemEquipmentTitle
}

const TitleInfo: NextPage<TitleInfoProps> = ({titleInfo}) => {
    return (
        <div className={styles.property1}>
            <div className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.wrapName}>
                        <div className={styles.div}>{titleInfo.title_name}</div>
                    </div>
                    <div className={styles.wrap}>
                        <div className={styles.itemInfo}>
                            <div className={styles.wrap1}>
                                <Image className={styles.imgIcon} width={64} height={64} alt="" src={titleInfo.title_icon || "/icons/empty/png"} />
                                <div className={styles.wrapTextInput}>
                                    <div className={styles.div1}>[옵션 지속 기간: 30일]</div>
                                </div>
                            </div>
                        </div>
                        <Image className={styles.dividerIcon} width={324} height={1} alt="" src="/icons/divider_item.svg" />
                    </div>
                    <div className={styles.wrapDetail}>
                        <div className={styles.ex5Container}>
                            <p className={styles.p}>{titleInfo.title_description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default TitleInfo;
