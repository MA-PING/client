import type {NextPage} from 'next';
import Image from "next/image";
import styles from '@/styles/search/crewEffect.module.css';
import {UnionRaiderPreset} from "@/interfaces/character";


interface CrewEffectProps {
    unionRaider: UnionRaiderPreset | null;
}

const CrewEffect: NextPage<CrewEffectProps> = ({unionRaider}) => {
    if(unionRaider === undefined){
        return (<></>);
    }
    return (
        <div className={styles.div}>
            <div className={styles.sss}>
                <div className={styles.container}>
                    <div className={styles.sss1}>SSS</div>
                </div>
                <div className={styles.container1}>
                    <div className={styles.wrapInfo}>
                        <div className={styles.wrapItem}>
                            <Image className={styles.imgCharacterIcon} width={40} height={40} alt=""
                                   src="img-character.png"/>
                            <div className={styles.wrap}>
                                <div className={styles.div1}>신궁</div>
                                <div className={styles.lv290}>LV. 290</div>
                            </div>
                        </div>
                        <div className={styles.mp10}>타격 성공 시 70%의 확률로 최대 MP의 10% 회복</div>
                    </div>
                    <div className={styles.wrapInfo}>
                        <div className={styles.wrapItem}>
                            <Image className={styles.imgCharacterIcon} width={40} height={40} alt=""
                                   src="img-character.png"/>
                            <div className={styles.wrap}>
                                <div className={styles.div1}>신궁</div>
                                <div className={styles.lv290}>LV. 290</div>
                            </div>
                        </div>
                        <div className={styles.mp10}>타격 성공 시 70%의 확률로 최대 MP의 10% 회복</div>
                    </div>
                    <div className={styles.wrapInfo}>
                        <div className={styles.wrapItem}>
                            <Image className={styles.imgCharacterIcon} width={40} height={40} alt=""
                                   src="img-character.png"/>
                            <div className={styles.wrap}>
                                <div className={styles.div1}>신궁</div>
                                <div className={styles.lv290}>LV. 290</div>
                            </div>
                        </div>
                        <div className={styles.mp10}>타격 성공 시 70%의 확률로 최대 MP의 10% 회복</div>
                    </div>
                </div>
            </div>
            <div className={styles.sss}>
                <div className={styles.container}>
                    <div className={styles.sss1}>SS</div>
                </div>
                <div className={styles.container3}>
                    <div className={styles.wrapInfo}>
                        <div className={styles.wrapItem}>
                            <Image className={styles.imgCharacterIcon} width={40} height={40} alt=""
                                   src="img-character.png"/>
                            <div className={styles.wrap}>
                                <div className={styles.div1}>신궁</div>
                                <div className={styles.lv290}>LV. 290</div>
                            </div>
                        </div>
                        <div className={styles.mp10}>타격 성공 시 70%의 확률로 최대 MP의 10% 회복</div>
                    </div>
                </div>
            </div>
            <div className={styles.s}>
                <div className={styles.container}>
                    <div className={styles.s1}>S</div>
                </div>
                <div className={styles.container5}>
                    <div className={styles.wrapInfo}>
                        <div className={styles.wrapItem}>
                            <Image className={styles.imgCharacterIcon} width={40} height={40} alt=""
                                   src="img-character.png"/>
                            <div className={styles.wrap}>
                                <div className={styles.div1}>신궁</div>
                                <div className={styles.lv290}>LV. 290</div>
                            </div>
                        </div>
                        <div className={styles.mp10}>타격 성공 시 70%의 확률로 최대 MP의 10% 회복</div>
                    </div>
                </div>
            </div>
            <div className={styles.s}>
                <div className={styles.container}>
                    <div className={styles.s1}>A</div>
                </div>
                <div className={styles.container5}>
                    <div className={styles.wrapInfo}>
                        <div className={styles.wrapItem}>
                            <Image className={styles.imgCharacterIcon} width={40} height={40} alt=""
                                   src="img-character.png"/>
                            <div className={styles.wrap}>
                                <div className={styles.div1}>신궁</div>
                                <div className={styles.lv290}>LV. 290</div>
                            </div>
                        </div>
                        <div className={styles.mp10}>타격 성공 시 70%의 확률로 최대 MP의 10% 회복</div>
                    </div>
                </div>
            </div>
            <div className={styles.s}>
                <div className={styles.container}>
                    <div className={styles.s1}>B</div>
                </div>
                <div className={styles.container5}>
                    <div className={styles.wrapInfo}>
                        <div className={styles.wrapItem}>
                            <Image className={styles.imgCharacterIcon} width={40} height={40} alt=""
                                   src="img-character.png"/>
                            <div className={styles.wrap}>
                                <div className={styles.div1}>신궁</div>
                                <div className={styles.lv290}>LV. 290</div>
                            </div>
                        </div>
                        <div className={styles.mp10}>타격 성공 시 70%의 확률로 최대 MP의 10% 회복</div>
                    </div>
                </div>
            </div>
        </div>);
};

export default CrewEffect;
