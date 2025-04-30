import type {NextPage} from 'next';
import styles from '../../styles/search/preset.module.css';
import {AbilityInfo} from "@/interfaces/character";

interface AbilityPresetProps {
    ability: AbilityInfo[]
}

const AbilityPreset: NextPage<AbilityPresetProps> = ({ability}) => {
    return (
        <div className={styles.preset}>
            <div className={styles.atomic}>
                <div className={styles.div2}>{ability[0].ability_value}</div>
            </div>
            <div className={styles.atomic1}>
                <div className={styles.div2}>{ability[1].ability_value}</div>
            </div>
            <div className={styles.atomic2}>
                <div className={styles.div2}>{ability[2].ability_value}</div>
            </div>
        </div>);
};

export default AbilityPreset;