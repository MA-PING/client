import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/page404.module.css';
import Link from "next/link";


const Page404:NextPage = () => {
    return (
        <div className={styles.content}>
            <div className={styles.div}>
                <Image className={styles.img4042Icon} width={400} height={418} alt="" src="/images/404.avif" />
            </div>
            <div className={styles.container}>
                <div className={styles.wrap}>
                    <div className={styles.title}>
                        <div className={styles.error}>404 ERROR</div>
                        <b className={styles.pageNotFound}>Page Not Found</b>
                    </div>
                    <div className={styles.div1}>
                        <p className={styles.p}>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
                        <p className={styles.p}>페이지의 주소가 변경되었거나 삭제되어 찾을 수 없습니다.</p>
                    </div>
                </div>
                <div className={styles.button}>
                    <Link href="/" className={styles.button1}>홈으로</Link>
                </div>
            </div>
        </div>);
};

export default Page404;
