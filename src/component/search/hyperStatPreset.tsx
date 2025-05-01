import type {NextPage} from 'next';
import styles from '../../styles/search/preset.module.css';
import {HyperStatPreset} from "@/interfaces/character";

interface HyperStatPresetProps {
    hyperStat: HyperStatPreset[]
}

const HyperPreset: NextPage<HyperStatPresetProps> = ({hyperStat}) => {
    const filteredHyperStat = hyperStat ? hyperStat.filter(stat => stat.stat_level >= 1) : [];

    if (filteredHyperStat.length === 0) {
        return (
            <div  className={styles.atomic10}>
                <div className={styles.lv0Wrapper}>
                    <div className={styles.hp}>LV. 0</div>
                </div>
                <div className={styles.noHyper}>아직 하이퍼 스탯이 없어요</div>
            </div>
        );
    }
    return (
        <div className={styles.preset1}>
            {filteredHyperStat.map(stat => (
                <div key={stat.stat_type} className={styles.atomic10}>
                    <div className={styles.lv0Wrapper}>
                        <div className={styles.hp}>LV. {stat.stat_level}</div>
                    </div>
                    <div className={styles.div5}>{stat.stat_increase}</div>
                </div>
            ))}
        </div>);
};

export default HyperPreset;