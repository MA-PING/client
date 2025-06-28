
import React from 'react';
import { Skeleton } from '@mui/material';
import styles from "@/styles/search/character.module.css";
import styles1 from '../../styles/search/characterTotalStat.module.css';

const DetailsSkeleton: React.FC = () => {

    return (
        <div className={styles.detailsDiv}>
            <div className={styles.title1}>
                <div className={styles.div1}>
                    <Skeleton variant="text" width={100} height={48} />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.title2}>
                    <div className={styles.tab}>
                        <Skeleton className={styles.tabAtomic} key={'  stats  '}/>
                    </div>
                </div>
                <div className={styles1.totalStat}>
                    <Skeleton className={styles1.item} variant="rounded"/>
                </div>
            </div>
        </div>
    );
};

export default DetailsSkeleton;