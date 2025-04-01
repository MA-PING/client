import CharacterInfo from "@/component/characterInfo";
import Footer from "@/component/footer";
import Header from "@/component/header";


export default function Home() {
    return (
        <div>
            <Header/>
            <div style={{justifyContent: "center" }}>
                <CharacterInfo/>
            </div>
            <Footer/>
        </div>
    );
}