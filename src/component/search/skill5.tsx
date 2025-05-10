import type {NextPage} from 'next';
import styles from '../../styles/search/skill.module.css';
import Image from "next/image";
import {Skill, SkillInfo} from "@/interfaces/character";
import {useState} from "react";
import SkillDetailInfo from "@/component/search/skillInfo";


interface Skill5Props {
    skill: Skill
}

const Skill5: NextPage<Skill5Props> = ({skill}) => {
    const [hoveredSkill, setHoveredSkill] = useState<SkillInfo | null>(null);
    if (skill.character_skill_grade === null){
        return(
            <div className={styles.noWrapLink}>
                <div className={styles.noStatusIndicator}>
                    <div className={styles.noIcon}>
                        <Image className={styles.noIconChild} width={17} height={17} alt="" src="/icons/CircleWarning.svg" />
                    </div>
                    <div className={styles.noLabel}>스킬을 보유하고있지 않아요</div>
                </div>
            </div>
        );
    }
    return (
        <div className={styles.wrapLink}>
            {skill.character_skill.map(skill =>
                <div key={skill.skill_name}
                     onMouseEnter={() => setHoveredSkill(skill)} // 마우스 진입 시 상태 업데이트
                     onMouseLeave={() => setHoveredSkill(null)}       // 마우스 이탈 시 상태 초기화
                     className={styles.item}
                >
                    <div className={styles.wrapSkill}>
                        <Image className={styles.imgSkill5Icon} width={40} height={40} alt="" src={skill.skill_icon}/>
                        <div className={styles.div2}>{skill.skill_name}</div>
                    </div>
                    <div className={styles.badge}>
                        <div className={styles.label}>{skill.skill_level}</div>
                    </div>
                    {hoveredSkill && hoveredSkill.skill_name === skill.skill_name && (
                        <SkillDetailInfo skill={hoveredSkill} />
                    )}
                </div>
            )}
        </div>);
};

export default Skill5;
