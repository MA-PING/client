'use client'
import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../../styles/home/patchNote1.module.css';
import { useState } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

interface PatchNote {
    title: string;
    url: string;
    date: string;
    summary: string;
    version: string;
}

interface Props {
    patchNotes: PatchNote[];
}

const PatchNotice: NextPage<Props> = ({ patchNotes }) => {
    // patchNotes가 undefined일 경우에 대비하여 초기값 설정
    const notes = patchNotes || [];
    const newVersion : string = notes[0].version;

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <div className={styles.ai}>
            <div className={styles.notes}>
                <div className={styles.div}>메이플스토리 패치 노트 요약</div>
                <div className={styles.div1}>{newVersion} 업데이트</div>
            </div>
            <div className={styles.wrapAccordian}>
                {/* notes 변수를 사용하여 map 함수 호출 */}
                {notes.map((note, index) => (
                    <div className={openIndex === index ? styles.accordianopen : styles.accordian} key={index}>
                        <div className={openIndex === index ? styles.wrap : styles.wrap} onClick={() => toggleAccordion(index)}>
                            <div className={styles.div2}>{note.title}</div>
                            <div className={styles.wrap1}>
                                <div className={styles.div3}>{note.date.split("T")[0].replace(/-/g, '.')}</div>
                                <Image
                                    className={styles.icon}
                                    width={32}
                                    height={32}
                                    alt=""
                                    src={openIndex === index ? "/icons/arrow_up.svg" : "/icons/arrow_down.svg"}
                                />
                            </div>
                        </div>
                        {openIndex === index && (
                            <div className={styles.info}>
                                <div className={styles.sDContainer}>
                                    <ul className={styles.sDI}>
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                li: ({ ...props }) => (
                                                    <li {...props} className={styles.li} />
                                                ),
                                            }}
                                        >
                                            {note.summary}
                                        </ReactMarkdown>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatchNotice;