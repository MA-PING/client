import { CharacterInfo } from "@/interfaces/character";

interface AutocompleteEntry {
    ocid: string;
    characterName: string;
    characterLevel: number;
    worldName: string;
    characterClass: string;
    guildName: string;
    characterImage: string;
}

export async function getAutocomplete(name: string): Promise<CharacterInfo[] | null> {
    try {
        const response = await fetch(`/api/characters/autocomplete?characterName=${encodeURIComponent(name)}`, {
            next: {
                revalidate: 10,
            },
        });
        if (!response.ok) {
            return null;
        }
        const data: AutocompleteEntry[] = await response.json();

        if (data === null) {
            return null;
        }
        return data.map((entry) => ({
            characterName: entry.characterName,
            world: entry.worldName,
            className: entry.characterClass,
            image: entry.characterImage,
            level: entry.characterLevel,
        }));
    } catch (error) {
        console.error('자동완성 가져오기 오류:', error);
        return null;
    }
}
