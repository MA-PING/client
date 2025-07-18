import {ApiCharacterResponse, CharacterInfo} from "@/interfaces/character";

export async function getAutocomplete(name: string): Promise<CharacterInfo[] | null> {
    try {
        const response = await fetch('https://api.ma-ping.com/api/v1/autocomplete?characterName=' + name, {
            next: {
                revalidate: 10,
            },
        });
        if (!response.ok) {
            return null;
        }
        const data: ApiCharacterResponse = await response.json();

        if (data.data === null) {
            return null;
        }
        return data.data;
    } catch (error) {
        console.error('자동완성 가져오기 오류:', error);
        return null;
    }
}