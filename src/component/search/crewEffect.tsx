import type {NextPage} from 'next';
import Image from "next/image";
import styles from '@/styles/search/crewEffect.module.css';
import {UnionRaiderPreset} from "@/interfaces/character";

// Props와 데이터 형태 정의 (기존과 동일)
interface CrewEffectProps {
    unionRaider: UnionRaiderPreset | null;
}
interface CrewEffect {
    block_type: string;
    block_class: string;
    block_level: string;
}
const classIconMap: { [key: string]: string } = {
    // --- 모험가 (Adventurers) ---
    // 전사
    '히어로': '/icons/class/hero.jpg',
    '팔라딘': '/icons/class/paladin.jpg',
    '다크나이트': '/icons/class/dark-knight.jpg',
    // 마법사
    '아크메이지(불,독)': '/icons/class/arch-mage-fp.jpg',
    '아크메이지(썬,콜)': '/icons/class/arch-mage-il.jpg',
    '비숍': '/icons/class/bishop.jpg',
    // 궁수
    '보우마스터': '/icons/class/bowmaster.jpg',
    '신궁': '/icons/class/marksman.jpg',
    '패스파인더': '/icons/class/pathfinder.jpg',
    // 도적
    '나이트로드': '/icons/class/night-lord.jpg',
    '섀도어': '/icons/class/shadower.jpg',
    '듀얼블레이더': '/icons/class/dual-blade.jpg',
    // 해적
    '바이퍼': '/icons/class/viper.jpg',
    '캡틴': '/icons/class/captain.jpg',
    '캐논슈터': '/icons/class/cannoneer.jpg',

    // --- 시그너스 기사단 (Cygnus Knights) ---
    '소울마스터': '/icons/class/soul-master.jpg',
    '미하일': '/icons/class/mihile.jpg',
    '플레임위자드': '/icons/class/flame-wizard.jpg',
    '윈드브레이커': '/icons/class/wind-breaker.jpg',
    '나이트워커': '/icons/class/night-walker.jpg',
    '스트라이커': '/icons/class/striker.jpg',

    // --- 레지스탕스 (Resistance) ---
    '블래스터': '/icons/class/blaster.jpg',
    '배틀메이지': '/icons/class/battle-mage.jpg',
    '와일드헌터': '/icons/class/wild-hunter.jpg',
    '메카닉': '/icons/class/mechanic.jpg',
    '제논': '/icons/class/xenon.jpg',
    '데몬슬레이어': '/icons/class/demon-slayer.jpg',
    '데몬어벤져': '/icons/class/demon-avenger.jpg',

    // --- 영웅 (Heroes) ---
    '아란': '/icons/class/aran.jpg',
    '에반': '/icons/class/evan.jpg',
    '루미너스': '/icons/class/luminous.jpg',
    '메르세데스': '/icons/class/mercedes.jpg',
    '팬텀': '/icons/class/phantom.jpg',
    '은월': '/icons/class/shade.jpg', // 은월의 영문명은 Shade

    // --- 노바 (Nova) ---
    '카이저': '/icons/class/kaiser.jpg',
    '카인': '/icons/class/kain.jpg',
    '카데나': '/icons/class/cadena.jpg',
    '엔젤릭버스터': '/icons/class/angelic-buster.jpg',

    // --- 레프 (Lef / Flora) ---
    '아델': '/icons/class/adele.jpg',
    '일리움': '/icons/class/illium.jpg',
    '아크': '/icons/class/ark.jpg',
    '칼리': '/icons/class/khali.jpg',

    // --- 아니마 (Anima) ---
    '호영': '/icons/class/hoyoung.jpg',
    '라라': '/icons/class/lara.jpg',
    '린': '/icons/class/lynn.jpg',
    '렌': '/icons/class/len.jpg',

    // --- 기타 ---
    '제로': '/icons/class/zero.jpg',
    '키네시스': '/icons/class/kinesis.jpg',

    'default': '/icons/empty.png',

};
const CharacterItem = ({ character }: { character: CrewEffect }) => {
    return (
        <div className={styles.wrapInfo}>
            <div className={styles.wrapItem}>
                <Image
                    className={styles.imgCharacterIcon}
                    width={40}
                    height={40}
                    alt={character.block_class}
                    src={classIconMap[character.block_class] ||'/icons/empty.png' }
                />
                <div className={styles.wrap}>
                    <div className={styles.div1}>{character.block_class}</div>
                    <div className={styles.lv290}>LV. {character.block_level}</div>
                </div>
            </div>
        </div>
    );
};

const CharacterGroup = ({ title, characters }: { title: string, characters: CrewEffect[] }) => {
    // 해당 등급에 캐릭터가 없으면 이 컴포넌트를 렌더링하지 않음
    if (!characters || characters.length === 0) {
        return null;
    }

    return (
        <div className={styles.sss}> {/* 등급별 스타일은 CSS에서 관리 */}
            <div className={styles.container}>
                <div className={styles.sss1}>{title}</div>
            </div>
            <div className={styles.container1}>
                {/* 캐릭터 목록을 순회하며 CharacterItem 컴포넌트를 렌더링 */}
                {characters.map(character => (
                    <CharacterItem key={character.block_class} character={character} />
                ))}
            </div>
        </div>
    );
};

const CrewEffect: NextPage<CrewEffectProps> = ({unionRaider}) => {
    if(!unionRaider || !unionRaider.union_block) {
        return null;
    }

    // 데이터 변환은 한 번만 수행
    const allEffects: CrewEffect[] = unionRaider.union_block.map(block => ({
        block_type: block.block_type,
        block_class: block.block_class,
        block_level: block.block_level,
    }));

    // 정렬 함수
    const sortDescByLevel = (a: CrewEffect, b: CrewEffect) => Number(b.block_level) - Number(a.block_level);

    // 등급과 레벨 범위를 한 곳에서 관리
    const categories = [
        { name: 'SSS', min: 250, max: Infinity },
        { name: 'SS',  min: 200, max: 250 },
        { name: 'S',   min: 140, max: 200 },
        { name: 'A',   min: 100, max: 140 },
        { name: 'B',   min: 60,  max: 100 },
    ];

    return (
        <div className={styles.div}>
            {/* categories 배열을 순회하며 각 등급 그룹을 동적으로 렌더링 */}
            {categories.map(category => {
                // 각 카테고리에 맞는 데이터를 필터링하고 정렬
                const charactersForGroup = allEffects
                    .filter(effect => {
                        const level = Number(effect.block_level);
                        return level >= category.min && level < category.max;
                    })
                    .sort(sortDescByLevel);

                return (
                    <CharacterGroup
                        key={category.name}
                        title={category.name}
                        characters={charactersForGroup}
                    />
                );
            })}
        </div>
    );
};

export default CrewEffect;