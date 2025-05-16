import Header from "@/component/header";
import { Suspense } from 'react';
import Loading from '@/component/search/loading'; // 1단계에서 만든 로딩 컴포넌트
import Character from '@/component/search/character'; // 2단계에서 만든 데이터 뷰 컴포넌트

// getCharacter 함수는 CharacterDataView 컴포넌트 내부로 이동했으므로 여기서는 필요 없습니다.

export default function Home({ params }: {
    params: { name: string } // params는 Promise가 아닌 객체입니다.
}) {
    const { name } = params; // params에서 직접 name을 추출합니다.

    return (
        <div>
            <Header />
            <Suspense fallback={<Loading />}>
                {/*
                  CharacterDataView는 비동기 컴포넌트입니다.
                  React Suspense는 이 컴포넌트의 데이터 로딩이 완료될 때까지 기다립니다.
                  데이터를 가져오는 동안 fallback으로 LoadingSpinner가 표시됩니다.
                */}
                <Character name={name} />
            </Suspense>
        </div>
    );
}