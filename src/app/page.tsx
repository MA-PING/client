import Link from "next/link";
import Image from 'next/image';
import styles from '../styles/home.header.module.css';
import PatchNotice from '@/component/home/patchNote';
import APIContents1 from "@/component/home/APIContents";
import Banner from "@/component/home/banner";
import Header from "@/component/header";

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
      <Banner/>
      <APIContents1/>
      <PatchNotice patchNotes={patchNotes}/>
  </div>
    );
}
