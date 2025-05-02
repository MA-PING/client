import type {NextPage} from 'next';
import styles from '../../styles/search/linkSkill.module.css';
import {LinkSkill} from "@/interfaces/character";
import {useState} from "react";
import SkillLinkPreset from "@/component/search/linkSkillPreset";


interface SkillLinkProps {
    skill: LinkSkill
}

const SkillLink: NextPage<SkillLinkProps> = ({skill}) => {
    const [activeLinkTab, setActiveLinkTab] = useState<number>(0);

    const handleTabLinkClick = (tabName: number) => {
        setActiveLinkTab(tabName);
    };
    return (
        <div className={styles.presetLink}>
            <div className={styles.tabSmallVertical}>
                <div className={styles.tab}>
                    <button className={activeLinkTab == 1 ? styles.tabAtomic : styles.tabAtomic1}
                            onClick={() => handleTabLinkClick(1)}
                    >
                        <div className={activeLinkTab == 1 ? styles.label : styles.label1}>프리셋 01</div>
                    </button>
                    <button className={activeLinkTab == 2 ? styles.tabAtomic : styles.tabAtomic1}
                            onClick={() => handleTabLinkClick(2)}
                    >
                        <div className={activeLinkTab == 2 ? styles.label : styles.label1}>프리셋 02</div>
                    </button>
                    <button className={activeLinkTab == 3 ? styles.tabAtomic : styles.tabAtomic1}
                            onClick={() => handleTabLinkClick(3)}
                    >
                        <div className={activeLinkTab == 3 ? styles.label : styles.label1}>프리셋 03</div>
                    </button>
                </div>
            </div>
            {activeLinkTab == 0 && <SkillLinkPreset skill={skill.character_link_skill}/>}
            {activeLinkTab == 1 && <SkillLinkPreset skill={skill.character_link_skill_preset_1}/>}
            {activeLinkTab == 2 && <SkillLinkPreset skill={skill.character_link_skill_preset_2}/>}
            {activeLinkTab == 3 && <SkillLinkPreset skill={skill.character_link_skill_preset_3}/>}
        </div>);
};

export default SkillLink;
