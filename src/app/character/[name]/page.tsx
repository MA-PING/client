import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()
    return (
        <div>
            <h1>캐릭터 이름: {router.query.name}</h1>
        </div>
    );
}