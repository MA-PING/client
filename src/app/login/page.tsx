import Header from "@/component/login/loginheader";
import Loginform from "@/component/login/loginform";
import Loginfooter from "@/component/login/loginfooter";


export default function Home() {
    return (
        <div>
            <Header/>
            <div className="flex justify-center items-center h-screen">
                <Loginform />
            </div>
            <Loginfooter/>
        </div>
    );
}