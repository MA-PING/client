'use client';

import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../../styles/search/characterInfo.module.css';
import { ApiResponse, Character } from "@/interfaces/character";
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { refreshCharacterData } from '@/app/actions';
import {serverImageMap} from "@/interfaces/serverImageMap";

interface CharacterInfoProps {
    response: ApiResponse;
}
const CharacterInfo: NextPage<CharacterInfoProps> = ({ response }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition(); // 로딩 상태 관리를 위한 훅

    const Character: Character = response.data;
    const characterProfileImage: string = Character.basic.character_image;
    const serverImage: string = serverImageMap[Character.basic.world_name];

    const handleRefresh = async () => {
        startTransition(async () => {
            // 서버에 있는 캐시를 먼저 무효화합니다.
            await refreshCharacterData(encodeURIComponent(Character.basic.character_name));
            // 그 다음, 새로운 데이터를 가져오도록 페이지를 새로고침합니다.
            router.refresh();
        });
    };

    return (
        <div className={styles.div11}>
            <div className={styles.title}>
                <div className={styles.div1}>캐릭터 정보</div>
            </div>
            <div className={styles.wrap}>
                <div className={styles.updateInfo}>
                    <div className={styles.wrapText}>
                        <div className={styles.div2}>마지막 업데이트 날짜</div>
                        <div className={styles.div3}>{response.responseAt.slice(11,16)}</div>
                    </div>
                    <button className={styles.button} onClick={handleRefresh} disabled={isPending}>
                        <div className={styles.button1}>
                            {isPending ? '갱신 중...' : '정보 갱신'}
                        </div>
                    </button>
                </div>
                <div className={styles.character}>
                    <div className={styles.wrapCharacterInfo}>
                        <Image className={styles.characterProfileIcon} width={149} height={149} alt="character_image"
                               src={characterProfileImage}/>
                        <div className={styles.container}>
                            <div className={styles.wrapPrimaryInfo}>
                                <Image className={styles.serverPngIcon} width={20} height={20} alt="server_image"
                                       src={serverImage}/>
                                <div
                                    className={styles.button1}>{Character.basic.character_name}</div>
                            </div>
                            <div className={styles.wrapSubInfo}>
                                <div
                                    className={styles.lv280}>LV. {Character.basic.character_level} | {Character.basic.character_class}</div>
                                {Character.basic.character_guild_name !== null ?
                                    <div className={styles.div5}>길드: {Character.basic.character_guild_name}</div> : <div/>
                                }
                            </div>
                        </div>
                    </div>
                    <button className={styles.button2}>
                        <div className={styles.icon}>
                            <Image className={styles.unionIcon} width={17} height={15} alt="" src="/icons/heart.svg"/>
                        </div>
                    </button>
                </div>
            </div>
        </div>);
};

export default CharacterInfo;