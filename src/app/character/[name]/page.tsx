
export default async function CharacterPage({ params }: { params: { name: string } }) {

    const { name } = await params;

    return (
        <div>
            <h1>캐릭터 이름: {name}</h1>
        </div>
    );
}
