import type { ApisResponse, Character, characterMainList } from '@/interfaces/character';
import { BACKEND_URL } from '@/utils/serverApi';

interface ApiBody {
    apiKey: string;
}

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

interface CharacterListResponseBody {
    characterList: CharacterListEntry[];
    character: Character;
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

export async function getApiCharacterList(body: ApiBody): Promise<ApisResponse | null> {
    try {
        const response = await fetch(`${BACKEND_URL}/api/characters/by-api-key`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            next: {
                revalidate: 100, // 100초마다 데이터 갱신
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('API 오류:', response.status, errorData);
            return null;
        }

        const data: CharacterListResponseBody = await response.json();

        if (data === null) {
            console.warn('API가 캐릭터 목록에 대해 null 데이터를 반환했습니다.');
            return null;
        }

        return {
            code: 'OK',
            message: '',
            responseAt: new Date().toISOString(),
            data: {
                characterList: data.characterList.map(toCharacterMainList),
                characterInfo: data.character,
            },
            success: true,
        };
    } catch (error) {
        console.error('캐릭터 목록 가져오기 실패:', error);
        return null;
    }
}
