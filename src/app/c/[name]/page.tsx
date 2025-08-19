
import { Suspense } from 'react';
import Loading from '@/component/search/loading'; // 1단계에서 만든 로딩 컴포넌트
import Character from '@/component/search/character'; // 2단계에서 만든 데이터 뷰 컴포넌트


export default async function Home({ params: paramsPromise }: {
    params: Promise<{ name: string }>
}) {
    const params = await paramsPromise;
    const { name } = params;

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <Character name={name} />
            </Suspense>
        </div>
    );
}