import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/linkSkill.module.css';
import {SkillInfo} from "@/interfaces/character";


interface SkillLinkPresetProps {
    skill: SkillInfo[]
}

const SkillLinkPreset: NextPage<SkillLinkPresetProps> = ({skill}) => {
    if (skill[0] === undefined){
        return(
            <div className={styles.noWrapLink}>
                <div className={styles.noStatusIndicator}>
                    <div className={styles.noIcon}>
                        <Image className={styles.noIconChild} width={17} height={17} alt="" src="/icons/CircleWarning.svg" />
                    </div>
                    <div className={styles.noLabel}>링크스킬을 보유하고있지 않아요</div>
                </div>
            </div>
        );
    }
    return (
        <div className={styles.wrapLink}>
            {skill.map(s =>
                <div key={s.skill_name} className={styles.item}>
                    <div className={styles.wrapSkill}>
                        <Image className={styles.imgSkill5Icon} width={40} height={40} alt="" src={s.skill_icon}/>
                        <div className={styles.div}>{s.skill_name}</div>
                    </div>
                    <div className={styles.badge}>
                        <div className={styles.label}>{s.skill_level}</div>
                    </div>
                </div>
            )}
        </div>);
};

export default SkillLinkPreset;
