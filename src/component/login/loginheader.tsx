import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../../styles/login/loginheader.module.css';
import Link from "next/link";


const Header:NextPage = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logoMaping}>
                <Link href="/"className={styles.logo}>
                    <Image className={styles.logoMapingIcon} width={30} height={22} alt="" src="/icons/Maping.svg" />
                    <Image className={styles.logoIcon} width={130} height={20} alt="" src="/icons/Logo.svg" />
                </Link>
            </div>
        </div>);
};

export default Header;
