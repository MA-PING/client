import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/artifact.module.css';
import { Union, UnionArtifact} from "@/interfaces/character";


interface ArtifactProps {
    union: Union
    unionArtifact: UnionArtifact
}

const Artifact: NextPage<ArtifactProps> = ({union, unionArtifact}) => {
    const artifactCrystal = unionArtifact.union_artifact_crystal
    const crystalMap = new Map<string, number>();

    artifactCrystal.forEach(Crystal => {
        crystalMap.set(Crystal.name, Crystal.level);
    });

    const crystal1 = crystalMap.get("크리스탈 : 주황버섯");
    const crystal2 = crystalMap.get("크리스탈 : 슬라임");
    const crystal3 = crystalMap.get("크리스탈 : 뿔버섯");
    const crystal4 = crystalMap.get("크리스탈 : 스텀프");
    const crystal5 = crystalMap.get("크리스탈 : 스톤골렘");
    const crystal6 = crystalMap.get("크리스탈 : 발록");
    const crystal7 = crystalMap.get("크리스탈 : 자쿰");
    const crystal8 = crystalMap.get("크리스탈 : 핑크빈");
    const crystal9 = crystalMap.get("크리스탈 : 파풀라투스");
    return (
        <div className={styles.div}>
            <div className={styles.title}>
                <div className={styles.div1}>아티펙트</div>
                <div className={styles.lv50}>LV. {union.union_artifact_level}</div>
            </div>
            <div className={styles.container}>
                <div className={styles.wrapArtifact}>
                    {crystal1 !== undefined ?
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal1 >= 1 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal1 >= 2 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal1 >= 3 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal1 >= 4 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal1 >= 5 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.imgArtifactIcon} width={72} height={64} alt="주황버섯"
                                       src={"/images/주황버섯.png"}/>
                                <div className={styles.div2}>주황버섯</div>
                            </div>
                        </div>:
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.iconcircleNegative} width={24} height={24} alt="" src="/icons/x.svg" />
                                <div className={styles.div}>주황버섯</div>
                            </div>
                        </div>
                    }
                    {crystal2 !== undefined ?
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal2 >= 1 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal2 >= 2 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal2 >= 3 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal2 >= 4 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal2 >= 5 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.imgArtifactIcon} width={72} height={64} alt="슬라임"
                                       src={"/images/슬라임.png"}/>
                                <div className={styles.div2}>슬라임</div>
                            </div>
                        </div>:
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.iconcircleNegative} width={24} height={24} alt="" src="/icons/x.svg" />
                                <div className={styles.div}>슬라임</div>
                            </div>
                        </div>
                    }
                    {crystal3 !== undefined ?
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal3 >= 1 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal3 >= 2 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal3 >= 3 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal3 >= 4 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal3 >= 5 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.imgArtifactIcon} width={72} height={64} alt="뿔버섯"
                                       src={"/images/뿔버섯.png"}/>
                                <div className={styles.div2}>뿔버섯</div>
                            </div>
                        </div>:
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.iconcircleNegative} width={24} height={24} alt="" src="/icons/x.svg" />
                                <div className={styles.div}>뿔버섯</div>
                            </div>
                        </div>
                    }
                    {crystal4 !== undefined ?
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal4 >= 1 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal4 >= 2 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal4 >= 3 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal4 >= 4 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal4 >= 5 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.imgArtifactIcon} width={72} height={64} alt="스텀프"
                                       src={"/images/스텀프.png"}/>
                                <div className={styles.div2}>스텀프</div>
                            </div>
                        </div>:
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.iconcircleNegative} width={24} height={24} alt="" src="/icons/x.svg" />
                                <div className={styles.div}>스텀프</div>
                            </div>
                        </div>
                    }
                    {crystal5 !== undefined ?
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal5 >= 1 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal5 >= 2 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal5 >= 3 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal5 >= 4 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal5 >= 5 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.imgArtifactIcon} width={72} height={64} alt="스톤골렘"
                                       src={"/images/스톤골렘.png"}/>
                                <div className={styles.div2}>스톤골렘</div>
                            </div>
                        </div>:
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.iconcircleNegative} width={24} height={24} alt="" src="/icons/x.svg" />
                                <div className={styles.div}>스톤골렘</div>
                            </div>
                        </div>
                    }
                    {crystal6 !== undefined ?
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal6 >= 1 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal6 >= 2 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal6 >= 3 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal6 >= 4 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal6 >= 5 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.imgArtifactIcon} width={72} height={64} alt="발록"
                                       src={"/images/발록.png"}/>
                                <div className={styles.div2}>발록</div>
                            </div>
                        </div>:
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.iconcircleNegative} width={24} height={24} alt="" src="/icons/x.svg" />
                                <div className={styles.div}>발록</div>
                            </div>
                        </div>
                    }
                    {crystal7 !== undefined ?
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal7 >= 1 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal7 >= 2 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal7 >= 3 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal7 >= 4 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal7 >= 5 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.imgArtifactIcon} width={72} height={64} alt="자쿰"
                                       src={"/images/자쿰.png"}/>
                                <div className={styles.div2}>자쿰</div>
                            </div>
                        </div>:
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.iconcircleNegative} width={24} height={24} alt="" src="/icons/x.svg" />
                                <div className={styles.div2}>자쿰</div>
                            </div>
                        </div>
                    }
                    {crystal8 !== undefined ?
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal8 >= 1 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal8 >= 2 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal8 >= 3 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal8 >= 4 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal8 >= 5 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.imgArtifactIcon} width={72} height={64} alt="핑크빈"
                                       src={"/images/핑크빈.png"}/>
                                <div className={styles.div2}>핑크빈</div>
                            </div>
                        </div>:
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.iconcircleNegative} width={24} height={24} alt="" src="/icons/x.svg" />
                                <div className={styles.div2}>핑크빈</div>
                            </div>
                        </div>
                    }
                    {crystal9 !== undefined ?
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal9 >= 1 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal9 >= 2 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal9 >= 3 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal9 >= 4 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src={crystal9 >= 5 ? "/icons/artifact-on.svg" : "/icons/artifact-off.svg"}/>
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.imgArtifactIcon} width={72} height={64} alt="파풀라투스"
                                       src={"/images/파풀라투스.png"}/>
                                <div className={styles.div2}>파풀라투스</div>
                            </div>
                        </div>:
                        <div className={styles.artifact}>
                            <div className={styles.wrapItem}>
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                                <Image className={styles.itemIcon} width={8} height={8} alt="" src="/icons/artifact-off.svg" />
                            </div>
                            <div className={styles.wrap}>
                                <Image className={styles.iconcircleNegative} width={24} height={24} alt="" src="/icons/x.svg" />
                                <div className={styles.div2}>파풀라투스</div>
                            </div>
                        </div>
                    }
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
