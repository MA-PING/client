import Header from "@/component/login/loginheader";
import Loginform from "@/component/login/loginform";
import Loginfooter from "@/component/login/loginfooter";


export default function Home() {
    return (
        <div>
            <Header/>
            <div style={{justifyContent: "center" }}>
                <Loginform />
            </div>
            <Loginfooter/>
        </div>
    );
}