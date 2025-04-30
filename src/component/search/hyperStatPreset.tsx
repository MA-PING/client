import type {NextPage} from 'next';
import styles from '../../styles/search/preset.module.css';
import {HyperStatPreset} from "@/interfaces/character";

interface HyperStatPresetProps {
    hyperStat: HyperStatPreset[]
}

const HyperStatPreset: NextPage<HyperStatPresetProps> = ({hyperStat}) => {
    console.log(hyperStat)
    return (
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
        </div>);
};

export default HyperStatPreset;