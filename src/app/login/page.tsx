import Header from "@/component/login/loginheader";
import Loginform from "@/component/login/loginform";


export default function Home() {
    return (
        <div>
            <Header/>
            <div style={{justifyContent: "center" }}>
                <Loginform />
            </div>
        </div>
    );
}