import type {NextPage} from 'next';
import Image from "next/image";
import styles from '@/styles/search/skillInfo.module.css';
import {SkillInfo} from "@/interfaces/character";


interface SkillDetailInfoProps {
    skill?: SkillInfo
}

const SkillDetailInfo: NextPage<SkillDetailInfoProps> = ({skill}) => {

    if(skill === undefined){
        return null;
    }
    const parts = skill.skill_description.split('\r\n');
    return (
        <div className={styles.property1}>
            <div className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.wrapName}>
                        <div className={styles.div}>{skill.skill_name}</div>
                    </div>
                    <div className={styles.wrap}>
                        <div className={styles.itemInfo}>
                            <div className={styles.wrap1}>
                                <Image className={styles.imgIcon} fill alt="스킬 아이콘" src={skill.skill_icon}/>
                                <div className={styles.wrapTextInput}>
                                    <div className={styles.div1}>{parts[0]}</div>
                                    <div className={styles.mp2400Container}>{parts[1]}</div>
                                </div>
                            </div>
                        </div>
                        <Image className={styles.dividerIcon} width={324} height={1} alt=""
                               src="/icons/divider_item.svg"/>
                    </div>
                    <div className={styles.wrapDetail}>
                        <div className={styles.mp2400Container}>{skill.skill_level}</div>
                        <div className={styles.mp2400Container}>
                            <p className={styles.p}>{skill.skill_effect}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default SkillDetailInfo;