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
    '히어로': '/icons/class/hero.png',
    '팔라딘': '/icons/class/paladin.png',
    '다크나이트': '/icons/class/dark-knight.png',
    // 마법사
    '아크메이지(불,독)': '/icons/class/arch-mage-fp.png',
    '아크메이지(썬,콜)': '/icons/class/arch-mage-il.png',
    '비숍': '/icons/class/bishop.png',
    // 궁수
    '보우마스터': '/icons/class/bowmaster.png',
    '신궁': '/icons/class/marksman.png',
    '패스파인더': '/icons/class/pathfinder.png',
    // 도적
    '나이트로드': '/icons/class/night-lord.png',
    '섀도어': '/icons/class/shadower.png',
    '듀얼블레이더': '/icons/class/dual-blade.png',
    // 해적
    '바이퍼': '/icons/class/viper.png',
    '캡틴': '/icons/class/captain.png',
    '캐논마스터': '/icons/class/cannoneer.png',

    // --- 시그너스 기사단 (Cygnus Knights) ---
    '소울마스터': '/icons/class/soul-master.png',
    '미하일': '/icons/class/mihile.png',
    '플레임위자드': '/icons/class/flame-wizard.png',
    '윈드브레이커': '/icons/class/wind-breaker.png',
    '나이트워커': '/icons/class/night-walker.png',
    '스트라이커': '/icons/class/striker.png',

    // --- 레지스탕스 (Resistance) ---
    '블래스터': '/icons/class/blaster.png',
    '배틀메이지': '/icons/class/battle-mage.png',
    '와일드헌터': '/icons/class/wild-hunter.png',
    '메카닉': '/icons/class/mechanic.png',
    '제논': '/icons/class/xenon.png',
    '데몬슬레이어': '/icons/class/demon-slayer.png',
    '데몬어벤져': '/icons/class/demon-avenger.png',

    // --- 영웅 (Heroes) ---
    '아란': '/icons/class/aran.png',
    '에반': '/icons/class/evan.png',
    '루미너스': '/icons/class/luminous.png',
    '메르세데스': '/icons/class/mercedes.png',
    '팬텀': '/icons/class/phantom.png',
    '은월': '/icons/class/shade.png',

    // --- 노바 (Nova) ---
    '카이저': '/icons/class/kaiser.png',
    '카인': '/icons/class/kain.png',
    '카데나': '/icons/class/cadena.png',
    '엔젤릭버스터': '/icons/class/angelic-buster.png',

    // --- 레프 (Lef / Flora) ---
    '아델': '/icons/class/adele.png',
    '일리움': '/icons/class/illium.png',
    '아크': '/icons/class/ark.png',
    '칼리': '/icons/class/khali.png',

    // --- 아니마 (Anima) ---
    '호영': '/icons/class/hoyoung.png',
    '라라': '/icons/class/lara.png',
    '린': '/icons/class/lynn.png',
    '렌': '/icons/class/len.png',

    // --- 기타 ---
    '제로': '/icons/class/zero.png',
    '키네시스': '/icons/class/kinesis.png',

    '모바일 캐릭터': '/icons/class/mapleM.png',
};

const classEffectsMap: { [key: string]: { [key: string]: string } } = {
    '히어로': { 'B': 'STR 10 증가', 'A': 'STR 20 증가', 'S': 'STR 40 증가', 'SS': 'STR 80 증가', 'SSS': 'STR 100 증가' },
    '팔라딘': { 'B': 'STR 10 증가', 'A': 'STR 20 증가', 'S': 'STR 40 증가', 'SS': 'STR 80 증가', 'SSS': 'STR 100 증가' },
    '다크나이트': { 'B': '최대 HP 2% 증가', 'A': '최대 HP 3% 증가', 'S': '최대 HP 4% 증가', 'SS': '최대 HP 5% 증가', 'SSS': '최대 HP 6% 증가' },
    '아크메이지(불,독)': { 'B': '최대 MP 2% 증가', 'A': '최대 MP 3% 증가', 'S': '최대 MP 4% 증가', 'SS': '최대 MP 5% 증가', 'SSS': '최대 MP 6% 증가' },
    '아크메이지(썬,콜)': { 'B': 'INT 10 증가', 'A': 'INT 20 증가', 'S': 'INT 40 증가', 'SS': 'INT 80 증가', 'SSS': 'INT 100 증가' },
    '비숍': { 'B': 'INT 10 증가', 'A': 'INT 20 증가', 'S': 'INT 40 증가', 'SS': 'INT 80 증가', 'SSS': 'INT 100 증가' },
    '보우마스터': { 'B': 'DEX 10 증가', 'A': 'DEX 20 증가', 'S': 'DEX 40 증가', 'SS': 'DEX 80 증가', 'SSS': 'DEX 100 증가' },
    '신궁': { 'B': '크리티컬 확률 1% 증가', 'A': '크리티컬 확률 2% 증가', 'S': '크리티컬 확률 3% 증가', 'SS': '크리티컬 확률 4% 증가', 'SSS': '크리티컬 확률 5% 증가' },
    '패스파인더': { 'B': 'DEX 10 증가', 'A': 'DEX 20 증가', 'S': 'DEX 40 증가', 'SS': 'DEX 80 증가', 'SSS': 'DEX 100 증가' },
    '나이트로드': { 'B': '크리티컬 확률 1% 증가', 'A': '크리티컬 확률 2% 증가', 'S': '크리티컬 확률 3% 증가', 'SS': '크리티컬 확률 4% 증가', 'SSS': '크리티컬 확률 5% 증가' },
    '섀도어': { 'B': 'LUK 10 증가', 'A': 'LUK 20 증가', 'S': 'LUK 40 증가', 'SS': 'LUK 80 증가', 'SSS': 'LUK 100 증가' },
    '듀얼블레이더': { 'B': 'LUK 10 증가', 'A': 'LUK 20 증가', 'S': 'LUK 40 증가', 'SS': 'LUK 80 증가', 'SSS': 'LUK 100 증가' },
    '바이퍼': { 'B': 'STR 10 증가', 'A': 'STR 20 증가', 'S': 'STR 40 증가', 'SS': 'STR 80 증가', 'SSS': 'STR 100 증가' },
    '캡틴': { 'B': '소환수 지속시간 4% 증가', 'A': '소환수 지속시간 6% 증가', 'S': '소환수 지속시간 8% 증가', 'SS': '소환수 지속시간 10% 증가', 'SSS': '소환수 지속시간 12% 증가' },
    '캐논마스터': { 'B': 'STR 10 증가', 'A': 'STR 20 증가', 'S': 'STR 40 증가', 'SS': 'STR 80 증가', 'SSS': 'STR 100 증가' },
    '블래스터': { 'B': '방어율 무시 1% 증가', 'A': '방어율 무시 2% 증가', 'S': '방어율 무시 3% 증가', 'SS': '방어율 무시 5% 증가', 'SSS': '방어율 무시 6% 증가' },
    '배틀메이지': { 'B': 'INT 10 증가', 'A': 'INT 20 증가', 'S': 'INT 40 증가', 'SS': 'INT 80 증가', 'SSS': 'INT 100 증가' },
    '와일드헌터': { 'B': '공격 시 20%의 확률로 데미지 4% 증가', 'A': '공격 시 20%의 확률로 데미지 8% 증가', 'S': '공격 시 20%의 확률로 데미지 12% 증가', 'SS': '공격 시 20%의 확률로 데미지 16% 증가', 'SSS': '공격 시 20%의 확률로 데미지 20% 증가' },
    '메카닉': { 'B': '버프 지속시간 5% 증가', 'A': '버프 지속시간 10% 증가', 'S': '버프 지속시간 15% 증가', 'SS': '버프 지속시간 20% 증가', 'SSS': '버프 지속시간 25% 증가' },
    '제논': { 'B': 'STR, DEX, LUK 5 증가', 'A': 'STR, DEX, LUK 10 증가', 'S': 'STR, DEX, LUK 20 증가', 'SS': 'STR, DEX, LUK 40 증가', 'SSS': 'STR, DEX, LUK 50 증가' },
    '데몬슬레이어': { 'B': '상태 이상 내성 1 증가', 'A': '상태 이상 내성 2 증가', 'S': '상태 이상 내성 3 증가', 'SS': '상태 이상 내성 4 증가', 'SSS': '상태 이상 내성 5 증가' },
    '데몬어벤져': { 'B': '보스 몬스터 공격 시 데미지 1% 증가', 'A': '보스 몬스터 공격 시 데미지 2% 증가', 'S': '보스 몬스터 공격 시 데미지 3% 증가', 'SS': '보스 몬스터 공격 시 데미지 5% 증가', 'SSS': '보스 몬스터 공격 시 데미지 6% 증가' },
    '아란': { 'B': '적 공격마다 70%의 확률로 순수 HP의 2% 회복', 'A': '적 공격마다 70%의 확률로 순수 HP의 4% 회복', 'S': '적 공격마다 70%의 확률로 순수 HP의 6% 회복', 'SS': '적 공격마다 70%의 확률로 순수 HP의 8% 회복', 'SSS': '적 공격마다 70%의 확률로 순수 HP의 10% 회복' },
    '에반': { 'B': '적 공격마다 70%의 확률로 순수 MP의 2% 회복', 'A': '적 공격마다 70%의 확률로 순수 MP의 4% 회복', 'S': '적 공격마다 70%의 확률로 순수 MP의 6% 회복', 'SS': '적 공격마다 70%의 확률로 순수 MP의 8% 회복', 'SSS': '적 공격마다 70%의 확률로 순수 MP의 10% 회복' },
    '루미너스': { 'B': 'INT 10 증가', 'A': 'INT 20 증가', 'S': 'INT 40 증가', 'SS': 'INT 80 증가', 'SSS': 'INT 100 증가' },
    '메르세데스': { 'B': '스킬 재사용 대기시간 2% 감소', 'A': '스킬 재사용 대기시간 3% 감소', 'S': '스킬 재사용 대기시간 4% 감소', 'SS': '스킬 재사용 대기시간 5% 감소', 'SSS': '스킬 재사용 대기시간 6% 감소' },
    '팬텀': { 'B': '메소 획득량 1% 증가', 'A': '메소 획득량 2% 증가', 'S': '메소 획득량 3% 증가', 'SS': '메소 획득량 4% 증가', 'SSS': '메소 획득량 5% 증가' },
    '은월': { 'B': '크리티컬 데미지 1% 증가', 'A': '크리티컬 데미지 2% 증가', 'S': '크리티컬 데미지 3% 증가', 'SS': '크리티컬 데미지 5% 증가', 'SSS': '크리티컬 데미지 6% 증가' },
    '소울마스터': { 'B': '최대 HP 250 증가', 'A': '최대 HP 500 증가', 'S': '최대 HP 1000 증가', 'SS': '최대 HP 2000 증가', 'SSS': '최대 HP 2500 증가' },
    '미하일': { 'B': '최대 HP 250 증가', 'A': '최대 HP 500 증가', 'S': '최대 HP 1000 증가', 'SS': '최대 HP 2000 증가', 'SSS': '최대 HP 2500 증가' },
    '플레임위자드': { 'B': 'INT 10 증가', 'A': 'INT 20 증가', 'S': 'INT 40 증가', 'SS': 'INT 80 증가', 'SSS': 'INT 100 증가' },
    '윈드브레이커': { 'B': 'DEX 10 증가', 'A': 'DEX 20 증가', 'S': 'DEX 40 증가', 'SS': 'DEX 80 증가', 'SSS': 'DEX 100 증가' },
    '나이트워커': { 'B': 'LUK 10 증가', 'A': 'LUK 20 증가', 'S': 'LUK 40 증가', 'SS': 'LUK 80 증가', 'SSS': 'LUK 100 증가' },
    '스트라이커': { 'B': 'STR 10 증가', 'A': 'STR 20 증가', 'S': 'STR 40 증가', 'SS': 'STR 80 증가', 'SSS': 'STR 100 증가' },
    '카이저': { 'B': 'STR 10 증가', 'A': 'STR 20 증가', 'S': 'STR 40 증가', 'SS': 'STR 80 증가', 'SSS': 'STR 100 증가' },
    '카인': { 'B': 'DEX 10 증가', 'A': 'DEX 20 증가', 'S': 'DEX 40 증가', 'SS': 'DEX 80 증가', 'SSS': 'DEX 100 증가' },
    '엔젤릭버스터': { 'B': 'DEX 10 증가', 'A': 'DEX 20 증가', 'S': 'DEX 40 증가', 'SS': 'DEX 80 증가', 'SSS': 'DEX 100 증가' },
    '카데나': { 'B': 'LUK 10 증가', 'A': 'LUK 20 증가', 'S': 'LUK 40 증가', 'SS': 'LUK 80 증가', 'SSS': 'LUK 100 증가' },
    '제로': { 'B': '경험치 획득량 4% 증가', 'A': '경험치 획득량 6% 증가', 'S': '경험치 획득량 8% 증가', 'SS': '경험치 획득량 10% 증가', 'SSS': '경험치 획득량 12% 증가' },
    '키네시스': { 'B': 'INT 10 증가', 'A': 'INT 20 증가', 'S': 'INT 40 증가', 'SS': 'INT 80 증가', 'SSS': 'INT 100 증가' },
    '아델': { 'B': 'STR 10 증가', 'A': 'STR 20 증가', 'S': 'STR 40 증가', 'SS': 'STR 80 증가', 'SSS': 'STR 100 증가' },
    '일리움': { 'B': 'INT 10 증가', 'A': 'INT 20 증가', 'S': 'INT 40 증가', 'SS': 'INT 80 증가', 'SSS': 'INT 100 증가' },
    '아크': { 'B': 'STR 10 증가', 'A': 'STR 20 증가', 'S': 'STR 40 증가', 'SS': 'STR 80 증가', 'SSS': 'STR 100 증가' },
    '칼리': { 'B': 'LUK 10 증가', 'A': 'LUK 20 증가', 'S': 'LUK 40 증가', 'SS': 'LUK 80 증가', 'SSS': 'LUK 100 증가' },
    '호영': { 'B': 'LUK 10 증가', 'A': 'LUK 20 증가', 'S': 'LUK 40 증가', 'SS': 'LUK 80 증가', 'SSS': 'LUK 100 증가' },
    '라라': { 'B': 'INT 10 증가', 'A': 'INT 20 증가', 'S': 'INT 40 증가', 'SS': 'INT 80 증가', 'SSS': 'INT 100 증가' },
    '린': { 'B': '주스탯 10 증가', 'A': '주스탯 20 증가', 'S': '주스탯 40 증가', 'SS': '주스탯 80 증가', 'SSS': '주스탯 100 증가' },
    '렌': { 'B': '최대 이동속도 2 증가', 'A': '최대 이동속도 4 증가', 'S': '최대 이동속도 6 증가', 'SS': '최대 이동속도 8 증가', 'SSS': '최대 이동속도 10 증가' },
    '모바일 캐릭터': { 'B': '공격력/마력 5 증가', 'A': '공격력/마력 10 증가', 'S': '공격력/마력 15 증가', 'SS': '공격력/마력 20 증가', 'SSS': '공격력/마력 25 증가' }
};


const CharacterItem = ({ character, grade }: { character: CrewEffect, grade: string }) => {
    const effect = classEffectsMap[character.block_class]?.[grade] || '효과 없음';

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
            <div className={styles.div2}>{effect}</div>
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
                    <CharacterItem key={character.block_class} character={character} grade={title} />
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