import Link from "next/link";
import Image from 'next/image';
import styles from '../styles/home.header.module.css';
import Footer from "@/component/footer";
import PatchNotice from '@/component/home/patchNote';
import APIContents from "@/component/home/APIContents";
import FloatingButton from "@/component/FloatingButton";
import Frame from "@/component/home/banner2";

interface PatchNote {
    title: string;
    url: string;
    date: string;
    summary: string;
    version: string;
}
interface ApiResponse {
    code: string;
    message: string;
    responseAt: string;
    data: PatchNote[];
    success: boolean;
}
async function getPatchNotes(): Promise<PatchNote[]> {
    try {
        const response = await fetch('https://api.ma-ping.com/api/v1/ai/notice', {
            next: {
                revalidate: 43200, // 12시간 (초)
            },
        });
        const data: ApiResponse = await response.json();
        return data.data;
    } catch (error) {
        console.error('패치 노트 가져오기 오류:', error);
        return [];
    }
}


export default async function Home() {
    const patchNotes = await getPatchNotes();
  return(
  <div>
      <Header/>
      <Frame/>
      <APIContents/>
      <PatchNotice patchNotes={patchNotes}/>
      <Footer/>
      <FloatingButton />
  </div>
    );
}

function Header(){
    return(
        <div className={styles.statusloginTypenonSearch}>
            <div className={styles.logoMaping}>
                <Link href="/" className={styles.logo}>
                    <Image className={styles.logoMapingIcon} width={30} height={22} alt="" src="/icons/Maping.svg" />
                    <Image className={styles.logoIcon} width={130} height={20} alt="" src="/icons/Logo.svg" />
                </Link>
            </div>
            <div className={styles.container}>
                <div className={styles.wrapItem}>
                    <Link href="/" className={styles.item}>
                        <div className={styles.div}>홈</div>
                    </Link>
                    <Link href="my-character" className={styles.item1}>
                        <div className={styles.div1}>내 캐릭터 정보</div>
                    </Link>
                    <Link href="simulator" className={styles.item1}>
                        <div className={styles.div1}>시뮬레이터</div>
                    </Link>
                    <Link href="ranking" className={styles.item1}>
                        <div className={styles.div1}>랭커정보</div>
                    </Link>
                </div>
            </div>
            {/*<div className={styles.button}>*/}
            {/*    <Image className={styles.icon} width={40} height={40} alt="" src="/icons/profile.png" />*/}
            {/*</div>*/}
            <Link href='/login' className={styles.buttonLongin}>
                <div className={styles.button1}>로그인</div>
            </Link>
        </div>
    );
}
