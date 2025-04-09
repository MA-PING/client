import Header from "@/component/header";
import Footer from "@/component/footer";

export default async function Home({params,}: {
    params: Promise<{ name: string }>
}) {
    const { name } = await params
    return (
        <div>
            <Header/>
            <h1>name: {name}</h1>
            <Footer/>
        </div>)
}