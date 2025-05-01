import type {NextPage} from 'next';
import styles from '../../styles/search/preset.module.css';
import {AbilityInfo} from "@/interfaces/character";

interface AbilityPresetProps {
    ability: AbilityInfo[]
}
function abilityGrade(grade: string): string {
    if (grade == "레전드리")
        return styles.atomic;
    else if (grade == "유니크")
        return styles.atomic1;
    else if (grade == "에픽")
        return styles.atomic2;
    else if (grade == "레어")
        return styles.atomic3;
    else
        return styles.atomic4;
}
const AbilityPreset: NextPage<AbilityPresetProps> = ({ability}) => {

    return (
        <div className={styles.preset}>
            <div className={abilityGrade(ability[0].ability_grade)}>
                <div className={styles.div2}>{ability[0].ability_value}</div>
            </div>
            <div className={abilityGrade(ability[1].ability_grade)}>
                <div className={styles.div2}>{ability[1].ability_value}</div>
            </div>
            <div className={abilityGrade(ability[2].ability_grade)}>
                <div className={styles.div2}>{ability[2].ability_value}</div>
            </div>
        </div>);
};

export default AbilityPreset;