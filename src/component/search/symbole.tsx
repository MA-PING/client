import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/symbol.module.css';
import Symbol1 from "@/component/search/symbol1";
import Symbol2 from "@/component/search/symbol2";
import {SymbolEquipment, SymbolEquipmentInfo} from "@/interfaces/character";


interface SymbolProps {
    symbol: SymbolEquipment
}

const Symbol: NextPage<SymbolProps> = ({symbol}) => {
    const symbol1: SymbolEquipmentInfo[] = symbol.symbol.filter(s =>
        s.symbol_name && s.symbol_name.includes("아케인심볼 : ")
    );
    const symbol2: SymbolEquipmentInfo[] = symbol.symbol.filter(s =>
        s.symbol_name && s.symbol_name.includes("어센틱심볼 : ")
    );
    return (
        <div className={styles.div}>
            <div className={styles.title}>
                <div className={styles.div1}>심볼</div>
            </div>
            {symbol.symbol[0] === undefined ?
                <div className={styles.noWrap}>
                    <div className={styles.noStatusIndicator}>
                        <div className={styles.noIcon}>
                            <Image className={styles.noIconChild} width={17} height={17} alt="" src="/icons/CircleWarning.svg" />
                        </div>
                        <div className={styles.noLabel}>아직 심볼을 모으지 않았어요</div>
                    </div>
                </div>:
                <div className={styles.wrap}>
                    <Symbol1 symbol={symbol1}/>
                    <Symbol2 symbol={symbol2}/>
                </div>
            }
        </div>);
};

export default Symbol;
