import type {NextPage} from 'next';
import Image from "next/image";
import styles from '@/styles/character/MiniCharacter.module.css';
import {characterMainList} from "@/interfaces/character";
import {serverImageMap} from "@/interfaces/serverImageMap";
import React from "react";


interface MiniCharacterProps {
    character: characterMainList,
    onclose: () => void,
    style?: React.CSSProperties
}

const MiniCharacter: NextPage<MiniCharacterProps> = ({character, onclose, style}) => {
    const server = serverImageMap[character.world_name];
    return (
        <div className={styles.div} style={style}>
            <Image className={styles.imageIcon} width={136} height={136} sizes="100vw" alt=""
                   src={character.character_image}/>
            <div className={styles.container}>
                <div className={styles.wrapCharacter}>
                    <div className={styles.wrapUserinfo}>
                        <Image className={styles.icon} width={18} height={18} sizes="100vw" alt=""
                               src={server}/>
                        <div className={styles.div1}>{character.character_name}</div>
                    </div>
                    <div
                        className={styles.lv280}>LV. {character.character_level} | {character.character_class}</div>
                </div>
                {character.character_guild_name !== null &&
                    <div className={styles.div2}>길드: {character.character_guild_name}</div>
                }
            </div>
            <button className={styles.button}>
                <div className={styles.icon1} onClick={onclose}>
                    <Image className={styles.itemIcon} width={20} height={20} sizes="100vw" alt=""
                           src="/icons/cancel.svg"/>
                </div>
            </button>
        </div>);
};

export default MiniCharacter;
