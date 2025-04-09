interface CharacterPageProps {
    params: {
        name: string;
    };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
    const { name } = params;

    return (
        <div>
            <h1>캐릭터 이름: {name}</h1>
        </div>
    );
}
