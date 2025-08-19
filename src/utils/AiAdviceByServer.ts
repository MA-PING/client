'use server'

import { cookies } from "next/headers";
import { getAiAdvice } from "./aiAdvice"; // 경로가 맞는지 확인하세요.

interface AiAdvice {
    skill: string | null;
    union: string | null;
    level: string | null;
}

export async function getAiAdviceByServer(ocid: string): Promise<AiAdvice | null> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        return null;
    }

    try {
        const skill = await getAiAdvice('LinkSkill', ocid, accessToken);
        const union = await getAiAdvice('union', ocid, accessToken);
        const level = await getAiAdvice('level', ocid, accessToken);

        return { skill, union, level };
    } catch (error) {
        console.error('getAiAdviceByServer 오류:', error);
        return null;
    }
}