import type {NextPage} from 'next';
import styles from '../../styles/search/skill.module.css';
import type {LinkSkill, Skill} from "@/interfaces/character";
import {useState} from "react";
import Skill5 from "@/component/search/skill5";
import SkillLink from "@/component/search/linkSkill";


interface SkillProps {
    skill5: Skill
    skill6: Skill
    linkSkill: LinkSkill
}

const Skill: NextPage<SkillProps> = ({skill5, skill6, linkSkill} ) => {
    const [activeSkillTab, setActiveSkillTab] = useState<string>('5차');

    const handleTabSkillClick = (tabName: string) => {
        setActiveSkillTab(tabName);
    };
    return (
        <div className={styles.div}>
            <div className={styles.div1}>스킬</div>
            <div className={styles.content}>
                <div className={styles.tabSmallHorizontal}>
                    <div className={styles.tab}>
                        <button className={activeSkillTab === '5차' ? styles.tabAtomic : styles.tabAtomic1}
                             onClick={() => handleTabSkillClick('5차')}
                        >
                            <div className={styles.label}>5차</div>
                        </button>
                        <button className={activeSkillTab === '6차' ? styles.tabAtomic : styles.tabAtomic1}
                             onClick={() => handleTabSkillClick('6차')}
                        >
                            <div className={styles.label1}>6차</div>
                        </button>
                        <button className={activeSkillTab === '링크' ? styles.tabAtomic : styles.tabAtomic1}
                             onClick={() => handleTabSkillClick('링크')}
                        >
                            <div className={styles.label1}>링크</div>
                        </button>
                    </div>
                </div>
                {activeSkillTab === '5차' && <Skill5 skill={skill5}/>}
                {activeSkillTab === '6차' && <Skill5 skill={skill6}/>}
                {activeSkillTab === '링크' && <SkillLink skill={linkSkill}/>}
            </div>
        </div>);
};

export default Skill;
