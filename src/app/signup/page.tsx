import Header from "@/component/signup/signupheader";
import Signupform from "@/component/signup/signupform";
export default function Home() {
    return (
        <div>
            <Header/>
            <div style={{justifyContent: "center" }}>
                <Signupform />
            </div>
        </div>
    );
}