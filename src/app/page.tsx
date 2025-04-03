import Link from "next/link";
import Image from 'next/image';
import styles from '../styles/home.header.module.css';
import Footer from "@/component/footer";
import NOTICE from "@/component/home/notice";
import Banner from "@/component/home/banner";
import APIContents from "@/component/home/APIContents";
import FloatingButton from "@/component/FloatingButton";

export default function Home() {
  return(
  <div>
      <Header/>
      <Banner/>
      <APIContents/>
      <NOTICE/>
      <Footer/>
      <FloatingButton/>
  </div>
    );
}

function Header(){
    return(
        <div className={styles.statusloginTypenonSearch}>
            <div className={styles.logoMaping}>
                <Link href="/" className={styles.logo}>
                    <Image className={styles.logoIcon} width={195} height={31} alt="" src="/icons/logo-maping.png" />
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
            <div className={styles.button}>
                <Image className={styles.icon} width={40} height={40} alt="" src="/icons/profile.png" />
            </div>
        </div>
    );
}
