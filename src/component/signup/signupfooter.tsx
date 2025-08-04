import { FunctionComponent } from 'react';
import styles from '../../styles/signup/signupfooter.module.css';


const Footer:FunctionComponent = () => {
    return (
        <div className={styles.footer} style={{ marginTop: "251px" }}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.div}>개인정보처리방침</div>
                    <img className={styles.infoChild} alt="" src="Vector 1.svg" />
                    <div className={styles.div1}>이용약관</div>
                </div>
            </div>
        </div>);
};

export default Footer;
//