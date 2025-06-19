import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/unionInnerStat.module.css';
import {UnionRaiderBlock} from "@/interfaces/character";


interface UnionInnerStatProps {
    unionBlock: UnionRaiderBlock[] | undefined
}

const UnionInnerStat: NextPage<UnionInnerStatProps> = ({unionBlock}) => {

    if (!unionBlock || unionBlock.length === 0) {
        return (<div className={styles.container}>
            <Image className={styles.lineIcon} width={352} height={320} sizes="100vw" alt="" src="/icons/line.svg"/>
            <div className={styles.gridNo}/>
            <div className={styles.property1hide}>
                <div className={styles.div}>공격력</div>
                <div className={styles.mp}>MP</div>
                <div className={styles.dex}>DEX</div>
                <div className={styles.div1}>마력</div>
                <div className={styles.div2}>버프지속시간</div>
                <div className={styles.div3}>상태이상내성</div>
                <div className={styles.div4}>일반데미지</div>
                <div className={styles.div5}>획득경험치</div>
                <div className={styles.hp}>HP</div>
                <div className={styles.luk}>LUK</div>
                <div className={styles.str}>STR</div>
                <div className={styles.int}>INT</div>
                <div className={styles.div6}>
                    <p className={styles.p}>크리티컬</p>
                    <p className={styles.p}>데미지</p>
                </div>
                <div className={styles.div7}>
                    <p className={styles.p}>보스</p>
                    <p className={styles.p}>공격력</p>
                </div>
                <div className={styles.div8}>
                    <p className={styles.p}>크리티컬</p>
                    <p className={styles.p}>확률</p>
                </div>
                <div className={styles.div9}>
                    <p className={styles.p}>방어율</p>
                    <p className={styles.p}>무시</p>
                </div>
            </div>
        </div>);
    }
    // 1. 좌표를 추출하고 변환합니다.
    const adjustedPositions = unionBlock.flatMap(block =>
        block.block_position.map(pos => ({
            x: pos.x + 11, // x값에 11 더하기
            y: Math.abs(pos.y - 10)  // y값에 10 더하기
        }))
    );
    const positionSet = new Set(
        adjustedPositions.map(pos => `${pos.x},${pos.y}`)
    );
    const gridCells = [];
    for (let y = 0; y < 20;y++){
        for (let x = 0; x < 22;x++){
            const currentKey = `${x},${y}`;
            if (positionSet.has(currentKey)) {
                // true: 좌표가 존재하면 주황색 블록을 추가
                gridCells.push(
                    <div key={currentKey} className={styles.gridOrange} />
                );
            } else {
                // false: 좌표가 없으면 검은색 블록을 추가
                gridCells.push(
                    <div key={currentKey} className={styles.gridBlack} />
                );
            }
        }
    }
    return (
        <div className={styles.container}>
            <Image className={styles.lineIcon} width={352} height={320} sizes="100vw" alt="" src="/icons/line.svg"/>
            <div className={styles.grid}>
                {gridCells}
            </div>
            <div className={styles.property1hide}>
                <div className={styles.div}>공격력</div>
                <div className={styles.mp}>MP</div>
                <div className={styles.dex}>DEX</div>
                <div className={styles.div1}>마력</div>
                <div className={styles.div2}>버프지속시간</div>
                <div className={styles.div3}>상태이상내성</div>
                <div className={styles.div4}>일반데미지</div>
                <div className={styles.div5}>획득경험치</div>
                <div className={styles.hp}>HP</div>
                <div className={styles.luk}>LUK</div>
                <div className={styles.str}>STR</div>
                <div className={styles.int}>INT</div>
                <div className={styles.div6}>
                    <p className={styles.p}>크리티컬</p>
                    <p className={styles.p}>데미지</p>
                </div>
                <div className={styles.div7}>
                    <p className={styles.p}>보스</p>
                    <p className={styles.p}>공격력</p>
                </div>
                <div className={styles.div8}>
                    <p className={styles.p}>크리티컬</p>
                    <p className={styles.p}>확률</p>
                </div>
                <div className={styles.div9}>
                    <p className={styles.p}>방어율</p>
                    <p className={styles.p}>무시</p>
                </div>
            </div>
        </div>);
};

export default UnionInnerStat;
