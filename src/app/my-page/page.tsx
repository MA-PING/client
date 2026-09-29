import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/utils/serverAuth';
import { getCharacterList } from '@/utils/characterList';
import MyPageContent from '@/component/myPage/MyPageContent';

export default async function MyPage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect('/login');
    }

    const characterList = await getCharacterList();

    return <MyPageContent initialUser={user} initialCharacterList={characterList} />;
}
