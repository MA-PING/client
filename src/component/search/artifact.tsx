import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/artifact.module.css';
import {Union, UnionArtifact} from "@/interfaces/character";


interface ArtifactProps {
    union: Union
    unionArtifact: UnionArtifact
}

const Artifact: NextPage<ArtifactProps> = ({union, unionArtifact}) => {
    return (
        <div className={styles.div}>
            <div className={styles.title}>
                <div className={styles.div1}>아티펙트</div>
                <div className={styles.lv50}>LV. {union.union_artifact_level}</div>
            </div>
            <div className={styles.container}>
                <div className={styles.wrapArtifact}>
                    {unionArtifact.union_artifact_crystal.map(crystal=>
                        <div key={crystal.name} className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal.level >= 1 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal.level >= 2 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal.level >= 3 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal.level >= 4 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal.level >= 5 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.imgArtifactIcon} width={72} height={64} alt={crystal.name.replace("크리스탈 : ", "")}
                                       src={"/images/" + crystal.name.replace("크리스탈 : ", "") + ".png"}/>
                                <div className={styles.div2}>주황버섯</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.effect}>
                    {unionArtifact.union_artifact_effect[0]!== undefined ?
                        unionArtifact.union_artifact_effect.map(effect =>
                            <div key={effect.name} className={styles.atomic}>
                                <div className={styles.lv0Wrapper}>
                                    <div className={styles.lv0}>LV. {effect.level}</div>
                                </div>
                                <div className={styles.div11}>{effect.name}</div>
                            </div>)
                        :
                        <div className={styles.atomic}>
                            <div className={styles.lv0Wrapper}>
                                <div className={styles.lv0}>LV. 0</div>
                            </div>
                            <div className={styles.div11}>아티팩트 효과가 없습니다.</div>
                        </div>
                    }
                </div>
            </div>
        </div>);
};

export default Artifact;
