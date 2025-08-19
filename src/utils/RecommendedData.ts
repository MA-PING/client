// 'use server'
//
// import { cookies } from "next/headers";
// import {recommendResponse} from "@/interfaces/character";
// import {getApiUserRecommend} from "@/utils/userRecommend";
//
// interface RecommendedData {
//     userRecommendData: recommendResponse | null;
//     characterRecommendData: recommendResponse | null;
//     mainCharacterName: string | null;
// }
//
// export async function getRecommendedData(ocid: string): Promise<RecommendedData | null> {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get('accessToken')?.value;
//     const userRecommendData = await getApiUserRecommend();
//     let characterRecommendData: recommendResponse | null = null;
//     let mainCharacterName: string | null = null;
//     let characterList = null;
//     let mainCharacter: characterMainList | null = null;
//
//     if (!accessToken) {
//         return {
//             userRecommendData,
//             characterRecommendData,
//             mainCharacterName,
//         };
//     }
//
//     try {
//
//     } catch (error) {
//         console.error('getRecommendedData 오류:', error);
//         return null;
//     }
// }