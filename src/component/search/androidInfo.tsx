import type {NextPage} from 'next';
import Image from "next/image";
import styles from '@/styles/search/androidInfo.module.css';
import type {AndroidEquipment} from "@/interfaces/character";


interface AndroidInfoProps {
    androidInfo: AndroidEquipment,
}

const AndroidInfo: NextPage<AndroidInfoProps> = ({androidInfo}) => {
    return (
        <div className={styles.property1}>
            <div className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.wrapName}>
                        <div className={styles.div}>{androidInfo.android_name}</div>
                    </div>
                    <div className={styles.wrap}>
                        <div className={styles.itemInfo}>
                            <div className={styles.wrap1}>
                                <Image className={styles.imgIcon} width={64} height={64} alt="" src={androidInfo.android_icon || "/icons/empty/png"}/>
                                <div className={styles.wrapTextInput}>
                                    <div className={styles.div1}>[요구 레벨 : 0]</div>
                                </div>
                            </div>
                        </div>
                        <Image className={styles.dividerIcon} width={324} height={1} alt=""
                               src="/icons/divider_item.svg"/>
                    </div>
                    <div className={styles.wrapDetail}>
                        <div className={styles.exContainer}>
                            <p className={styles.p}>{androidInfo.android_description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default AndroidInfo;
