import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/symbol.module.css';
import {SymbolEquipmentInfo} from "@/interfaces/character";


interface Symbol1Props {
    symbol: SymbolEquipmentInfo[]
}

const Skill1: NextPage<Symbol1Props> = ({symbol}) => {
    let force: number = 0;
    const stat = [0, 0, 0, 0, 0];
    for (const s of symbol){
        force += parseInt(s.symbol_force, 10);
        stat[0] += parseInt(s.symbol_str, 10);
        stat[1] += parseInt(s.symbol_dex, 10);
        stat[2] += parseInt(s.symbol_int, 10);
        stat[3] += parseInt(s.symbol_luk, 10);
        stat[4] += parseInt(s.symbol_hp, 10);
    }
    return (
        <div className={styles.div2}>
            <div className={styles.item}>
                <div className={styles.title1}>
                    <div className={styles.wrapArcane}>
                        <div className={styles.arc}>아케인포스</div>
                        <div className={styles.div4}>+{force.toLocaleString()}</div>
                    </div>
                    <div className={styles.div5}>|</div>
                    <div className={styles.wrapArcane}>
                        <div className={styles.arc}>주스탯</div>
                        <div className={styles.div4}>+{Math.max.apply(null, stat)}</div>
                    </div>
                </div>
            </div>
            <div className={styles.wrapSymbol}>
                    {symbol.map(s =>
                        <div key={s.symbol_name} className={styles.content}>
                            <div className={styles.title2}>
                                <div className={styles.div8}>{s.symbol_name.replace("아케인심볼 : ", "")}</div>
                            </div>
                            <div className={styles.container}>
                                <div className={styles.wrap1}>
                                    <Image className={styles.imgArcforceIcon} width={40} height={40} alt={s.symbol_name.replace("아케인심볼 : ", "")}
                                           src={s.symbol_icon}/>
                                    <div className={styles.badge}>
                                        <div className={styles.arc}>{s.symbol_level}</div>
                                    </div>
                                </div>
                                <div className={styles.wrap2}>
                                    <div className={styles.wrapDetail}>
                                        <div className={styles.arc}>ARC</div>
                                        <div className={styles.div10}>{s.symbol_force}</div>
                                    </div>
                                    <div className={styles.wrapDetail}>
                                        <div className={styles.arc}>주스탯</div>
                                        <div className={styles.div10}>+2,200</div>
                                    </div>
                                    <div className={styles.wrapDetail}>
                                        <div className={styles.arc}>성장치</div>
                                        <div className={styles.div10}>{s.symbol_growth_count}/{s.symbol_require_growth_count}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Skill1;

