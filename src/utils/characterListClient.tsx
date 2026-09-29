import { characterMainList } from '@/interfaces/character';

interface CharacterListEntry {
    ocid: string;
    characterName: string;
    characterImage: string;
    worldName: string;
    characterClass: string;
    characterLevel: number;
    guildName: string;
    mainCharacter: boolean;
}

function toCharacterMainList(entry: CharacterListEntry): characterMainList {
    return {
        ocid: entry.ocid,
        character_name: entry.characterName,
        character_image: entry.characterImage,
        world_name: entry.worldName,
        character_class: entry.characterClass,
        character_level: entry.characterLevel,
        character_guild_name: entry.guildName,
        main_character: entry.mainCharacter,
    };
}

// 클라이언트 컴포넌트 전용. 로그인 세션은 httpOnly 쿠키로 유지되므로 same-origin 요청이면 충분하다.
export async function getCharacterListClient(): Promise<characterMainList[] | null> {
    try {
        const response = await fetch('/api/characters/me/list', { credentials: 'same-origin' });

        if (!response.ok) {
            return null;
        }

        const data: CharacterListEntry[] = await response.json();
        if (data === null) {
            return null;
        }

        return data.map(toCharacterMainList);
    } catch (error) {
        console.error('캐릭터 목록 가져오기 실패:', error);
        return null;
    }
}
