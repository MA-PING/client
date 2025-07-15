import type {NextPage} from 'next';
import Image from "next/image";
import styles from '@/styles/chat/chatBot.module.css';
import React, {useEffect, useRef, useState} from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {getNewGuestMessage} from "@/utils/guestChat";
import {chatHistory} from "@/interfaces/character";
import {getChatHistory} from "@/utils/chatHistory";
import {deleteChatHistory} from "@/utils/deleteChat";
import {getChatContent} from "@/utils/chatHistoryContent";

interface aiBody {
    chatId: string | null;
    ocid: string | null;
    characterName: string | null;
    type: string | null;
    text: string;
}

interface aiGuestStream {
    topic: string;
    uuid: string; // AI 응답에 uuid가 있다면 사용, 없으면 불필요
    content: string;
}

// 채팅 메시지 타입을 정의합니다.
interface ChatMessage {
    type: 'user' | 'ai';
    text: string;
    timestamp: Date; // 메시지 시간을 추가
    id: string; // 각 메시지를 고유하게 식별할 ID (스트림 연결용)
    pending?: boolean;
}

interface ChatBotProps {
    onClose: () => void,
    size: boolean
}

let messageIdCounter = 0; // 컴포넌트 외부에서 고유 ID를 위한 카운터

const ChatBot: NextPage<ChatBotProps> = ({onClose, size}) => {
    const [userChatHistory, setUserChatHistory] = useState<chatHistory[]>([]); // 사용자 채팅 기록 상태
    const [inputValue, setInputValue] = useState('');
    const [pageValue, setPageValue] = useState<string>('default');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const chatEndRef = useRef<HTMLDivElement>(null); // 채팅 맨 아래로 스크롤하기 위한 ref
    const [currentChatTopic, setCurrentChatTopic] = useState<string>('새로운 대화'); // 초기 토픽
    const [currentChatId, setCurrentChatId] = useState<string | null>(null); // 현재 채팅의 chatId 상태
    const [isLogin, setLogin] = useState(false);
    const userInfoRedux = useSelector((state: RootState) => state.userInfo);
    useEffect(() => {
        if (userInfoRedux.userName) {
            setLogin(true);
        }else {
            setLogin(false)
        }

    }, [userInfoRedux.userName]);
    const handlePageClick = (page: string) => {
        setPageValue(page);
        if (page === 'history' && isLogin && userInfoRedux.accessToken) {
            fetchChatHistory(userInfoRedux.accessToken);
        }
    };
    // 채팅 내용이 업데이트될 때마다 맨 아래로 스크롤
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [chatHistory]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };


    const handleSendMessage = async () => {
        const message = inputValue.trim();
        if (message === '') return;

        // 사용자 메시지에 고유 ID 할당
        const userMessageId = `user-${Date.now()}-${messageIdCounter++}`; // 더 고유한 ID
        setChatHistory((prevHistory) => [...prevHistory, {
            type: 'user',
            text: message,
            timestamp: new Date(),
            id: userMessageId
        }]);

        // 페이지가 'chat'이 아니면 'chat'으로 설정
        if (pageValue !== 'chat') {
            setPageValue('chat');
        }

        setInputValue(''); // 메시지 전송 후 즉시 입력창 비우기

        // AI 응답을 위한 플레이스홀더 메시지 추가 (고유 ID 할당)
        // pending: true를 추가하여 스켈레톤을 표시하도록 합니다.
        const aiMessageId = `ai-placeholder-${Date.now()}-${messageIdCounter++}`; // 더 고유한 ID
        setChatHistory((prevHistory) => [...prevHistory, {
            type: 'ai',
            text: '', // 텍스트는 빈 문자열로 시작하고 스트림 데이터를 받을 때 채워집니다.
            timestamp: new Date(),
            id: aiMessageId,
            pending: true // AI 응답이 로딩 중임을 나타냅니다.
        }]);

        // 스트림 데이터를 처리하는 콜백 함수
        const handleStreamData = (data: aiGuestStream) => {
            setChatHistory((prevHistory) => {
                const lastAiMessageIndex = prevHistory.findIndex(msg => msg.id === aiMessageId);

                // **첫 번째 AI 응답 시 uuid와 topic을 저장합니다.**
                if (currentChatId === null && data.uuid) { // currentChatId가 null일 때만 저장
                    setCurrentChatId(data.uuid);
                    // console.log("새 채팅 ID 설정:", data.uuid); // 디버깅
                }
                if (data.topic && data.topic !== currentChatTopic) {
                    setCurrentChatTopic(data.topic);
                    // console.log("새 토픽 설정:", data.topic); // 디버깅
                }

                if (lastAiMessageIndex !== -1) {
                    const newHistory = [...prevHistory];
                    // 기존 메시지 텍스트에 새로운 content를 추가하고 pending 상태를 false로 변경합니다.
                    newHistory[lastAiMessageIndex] = {
                        ...newHistory[lastAiMessageIndex],
                        text: newHistory[lastAiMessageIndex].text + data.content,
                        timestamp: new Date(),
                        pending: false // 첫 데이터가 오면 pending을 false로 설정
                    };
                    return newHistory;
                } else {
                    // 예상치 못한 상황: 플레이스홀더를 찾지 못함. 새 메시지로 추가
                    console.warn("AI 플레이스홀더 메시지를 찾을 수 없습니다. 새 AI 메시지를 추가합니다.");
                    return [...prevHistory, {
                        type: 'ai',
                        text: data.content,
                        timestamp: new Date(),
                        id: `ai-new-${Date.now()}-${messageIdCounter++}`,
                        pending: false
                    }];
                }
            });
        };

        // 스트림 종료 시 호출될 콜백
        const handleStreamEnd = () => {
            setChatHistory((prevHistory) => {
                // 스트림 종료 후 플레이스홀더 메시지(있는 경우) 최종 처리 또는 제거
                return prevHistory.map(msg => {
                    if (msg.id === aiMessageId) {
                        // pending 상태를 false로 확실히 변경
                        return {
                            ...msg,
                            pending: false,
                            // 만약 스트림이 아무 내용도 보내지 않고 종료되었다면
                            text: msg.text === '' ? 'AI가 응답을 생성하지 못했습니다.' : msg.text,
                            timestamp: new Date()
                        };
                    }
                    return msg;
                });
            });
        };

        // 스트림 오류 시 호출될 콜백
        const handleStreamError = (errorContent: string) => {
            setChatHistory((prevHistory) => {
                const lastAiMessageIndex = prevHistory.findIndex(msg => msg.id === aiMessageId);
                if (lastAiMessageIndex !== -1) {
                    const newHistory = [...prevHistory];
                    // 오류 메시지로 플레이스홀더를 업데이트하거나 새 오류 메시지를 추가하고 pending 상태를 false로 변경합니다.
                    newHistory[lastAiMessageIndex] = {
                        ...newHistory[lastAiMessageIndex],
                        text: (newHistory[lastAiMessageIndex].text === '' ? '' : newHistory[lastAiMessageIndex].text) + ` (오류: ${errorContent})`,
                        timestamp: new Date(),
                        pending: false // 오류 발생 시 pending을 false로 설정
                    };
                    return newHistory;
                }
                return [...prevHistory, {
                    type: 'ai',
                    text: `AI와 통신 중 오류 발생: ${errorContent}`,
                    timestamp: new Date(),
                    id: `ai-error-${Date.now()}-${messageIdCounter++}`,
                    pending: false
                }];
            });
        };


        try {
            const body: aiBody = {
                chatId: currentChatId, // 여기에 currentChatId를 사용합니다!
                ocid: null,
                characterName: null,
                type: null,
                text: message, // 사용자의 메시지
            };
            // 스트림 데이터를 처리할 콜백 함수들을 전달합니다.
            await getNewGuestMessage(body, handleStreamData, handleStreamEnd, handleStreamError);

        } catch (error) {
            console.error("메시지 전송 또는 AI 응답 수신 최상위 오류:", error);
            // 전체 함수 레벨에서의 최종 오류 처리 (네트워크 요청 자체 실패 등)
            setChatHistory((prevHistory) => {
                const lastAiMessage = prevHistory.find(msg => msg.id === aiMessageId);
                if (lastAiMessage) {
                    const updatedHistory = [...prevHistory];
                    const index = updatedHistory.indexOf(lastAiMessage);
                    updatedHistory[index] = {
                        ...lastAiMessage,
                        text: (lastAiMessage.text === '' ? '' : lastAiMessage.text) + ' (전송 실패: 네트워크 오류)',
                        timestamp: new Date(),
                        pending: false // 오류 발생 시 pending을 false로 설정
                    };
                    return updatedHistory;
                }
                return [...prevHistory, {
                    type: 'ai',
                    text: 'AI와 통신 중 네트워크 오류가 발생했습니다.',
                    timestamp: new Date(),
                    id: `ai-final-error-${Date.now()}-${messageIdCounter++}`,
                    pending: false
                }];
            });
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    // 날짜 부분만 포맷팅하는 헬퍼 함수
    const formatDateOnly = (date: Date) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const isToday = date.toDateString() === today.toDateString();
        const isYesterday = date.toDateString() === yesterday.toDateString();

        if (isToday) {
            return `오늘`;
        } else if (isYesterday) {
            return `어제`;
        } else {
            return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
        }
    };

    // 시간 부분만 포맷팅하는 헬퍼 함수
    const formatTimeOnly = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };
    // 채팅 기록 시간을 "N시간 전" 또는 "N분 전" 등으로 표시하는 함수
    const formatRelativeTime = (isoDateTime: string): string => {
        const date = new Date(isoDateTime);
        const now = new Date();
        const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffSeconds < 60) {
            return `${diffSeconds}초 전`;
        } else if (diffSeconds < 3600) {
            return `${Math.floor(diffSeconds / 60)}분 전`;
        } else if (diffSeconds < 86400) {
            return `${Math.floor(diffSeconds / 3600)}시간 전`;
        } else if (diffSeconds < 604800) { // 7 days
            return `${Math.floor(diffSeconds / 86400)}일 전`;
        } else {
            return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
        }
    };


    const fetchChatHistory = async (accessToken: string) => {
        try {
            // 가정: getChatHistory 함수는 access token을 받아 채팅 기록 배열을 반환합니다.
            const history = await getChatHistory(accessToken); // getChatHistory 함수 호출
            if (history !== null){
                setUserChatHistory(history);
            }else{
                setUserChatHistory([]);
            }

        } catch (error) {
            console.error("채팅 기록을 가져오는 데 실패했습니다:", error);
            // 사용자에게 오류를 알리거나 적절한 처리를 할 수 있습니다.
        }
    };
    // 특정 채팅 기록을 클릭했을 때 호출될 함수
    const handleHistoryItemClick = async (chatId: string, topic: string) => {
        setCurrentChatId(chatId);
        setCurrentChatTopic(topic.replace('\n', ''));
        setPageValue('chat'); // 채팅 페이지로 전환
        await convertMessage(chatId);
    };

    // 채팅 기록 삭제 함수 (예시)
    const handleDeleteHistoryItem = async (chatId: string) => {
        console.log(`채팅 ID ${chatId} 삭제 요청`);
        if (userInfoRedux.accessToken){
            const deleteBool =  await deleteChatHistory(userInfoRedux.accessToken, chatId);
            if (deleteBool){
                setUserChatHistory(prev => prev.filter(item => item.chatId !== chatId));
            }
        }
    };
    const convertMessage = async (chatId: string) => {
        if (userInfoRedux.accessToken) {
            try {
                // getChatContent 함수는 ChatContentResponse 타입을 반환한다고 가정합니다.
                const historyData = await getChatContent(userInfoRedux.accessToken, chatId);

                if (historyData !== null && historyData.history) {
                    const convertedChatMessages: ChatMessage[] = [];

                    historyData.history.forEach((item, index) => {
                        // 사용자 메시지
                        convertedChatMessages.push({
                            type: 'user',
                            text: item.question,
                            timestamp: new Date(item.timestamp),
                            id: `user-${item.timestamp}-${index}`, // 고유 ID 생성
                            pending: false,
                        });

                        // AI 응답 (answer가 있을 경우에만 추가)
                        if (item.answer) {
                            convertedChatMessages.push({
                                type: 'ai',
                                text: item.answer,
                                timestamp: new Date(item.timestamp), // AI 응답의 타임스탬프도 동일하게 사용
                                id: `ai-${item.timestamp}-${index}`, // 고유 ID 생성
                                pending: false,
                            });
                        }
                    });

                    // 타임스탬프 기준으로 정렬 (필요하다면)
                    convertedChatMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

                    setChatHistory(convertedChatMessages);
                } else {
                    setChatHistory([]); // 기록이 없으면 채팅 기록 초기화
                    setCurrentChatId(null);
                    setCurrentChatTopic('새로운 대화');
                }
            } catch (error) {
                console.error("채팅 내용을 불러오거나 변환하는 데 실패했습니다:", error);
                setChatHistory([{
                    type: 'ai',
                    text: '이전 대화 기록을 불러오는 데 실패했습니다.',
                    timestamp: new Date(),
                    id: `error-${Date.now()}`,
                    pending: false
                }]);
                setCurrentChatId(null);
                setCurrentChatTopic('새로운 대화');
            }
        }
    };


    return (
        <div className={!size ? styles.statusdefaultTypesmallLo : styles.statusdefaultTypesmallLoBig}>
            {/* 기본 페이지 (default) */}
            {pageValue === 'default' && (
                <>
                    <div className={styles.headerChatbot}>
                        {isLogin ?
                            <div className={styles.wrapFilterLogin}>
                                <div className={styles.button}>
                                    <Image width={16} height={16} alt='"' src="/icons/filter.svg"/>
                                    <div className={styles.ai}>검색필터</div>
                                </div>
                                <Image className={styles.dividerIcon} width={1} height={18} sizes="100vw" alt=""
                                       src="/icons/Divider1.svg"/>
                                <div className={styles.wrapLogin}>
                                    <div className={styles.textInput}>
                                        <div className={styles.textInputLogin1}>
                                            <div className={styles.div23}>캐릭터 닉네임</div>
                                        </div>
                                    </div>
                                    <div className={styles.div24}>에게 딱 맞는</div>
                                    <div className={styles.textInput2}>
                                        <div className={styles.textInputLogin1}>
                                            <div className={styles.div23}>필터선택</div>
                                        </div>
                                    </div>
                                </div>
                            </div>:
                            <div className={styles.wrapFilter}>
                                <div className={styles.button}>
                                    <Image width={16} height={16} alt='"' src="/icons/filterNo.svg"/>
                                    <div className={styles.ai}>검색필터</div>
                                </div>
                                <Image className={styles.dividerIcon} width={1} height={18} sizes="100vw" alt=""
                                       src="/icons/Divider1.svg"/>
                                <div className={styles.wrap}>
                                    <div className={styles.textInput}>
                                        <div className={styles.textInput1}>
                                            <div className={styles.div23}>캐릭터 닉네임</div>
                                        </div>
                                    </div>
                                    <div className={styles.div24}>에게 딱 맞는</div>
                                    <div className={styles.textInput2}>
                                        <div className={styles.textInput1}>
                                            <div className={styles.div23}>필터선택</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className={styles.wrapIcon}>
                            <div className={styles.buttonChat}>
                                <div className={styles.icon}>
                                    <Image className={styles.vector2Stroke} width={24} height={24} sizes="100vw" alt=""
                                           src="/icons/gray_question_mark.svg"/>
                                </div>
                            </div>
                            <div className={styles.buttonChat}>
                                <button onClick={() => handlePageClick('history')} className={styles.icon}>
                                    <Image className={styles.vector2Stroke} width={24} height={24} sizes="100vw" alt=""
                                           src="/icons/history.svg"/>
                                </button>
                            </div>
                            <div className={styles.buttonChat}>
                                <button className={styles.icon}>
                                    <Image className={styles.vector2Stroke} width={24} height={24} sizes="100vw" alt=""
                                           src="/icons/menu.svg"/>
                                </button>
                            </div>
                            <div className={styles.buttonChat}>
                                <button onClick={onClose} className={styles.icon}>
                                    <Image className={styles.vector2Stroke} width={24} height={24} sizes="100vw" alt=""
                                           src="/icons/cancel.svg"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.title}>
                            {isLogin ?
                                <div className={styles.ai}>안녕하세요 {userInfoRedux.userName}님! 오늘은 무엇을 도와드릴까요?</div>:
                                <div className={styles.ai}>당신에게 딱 맞는 메이플 길라잡이 메이 AI에요. 무엇을 도와드릴까요?</div>
                            }
                        </div>
                        {isLogin &&
                            <div className={styles.inPageNavigationSmall}>
                                <div className={styles.wrapTitle}>
                                    <div className={styles.icon}>
                                        <Image className={styles.iconChild} width={11.7} height={11.7} sizes="100vw" alt=""
                                               src="/icons/search.svg"/>
                                    </div>
                                    <div className={styles.title1}>
                                        <div className={styles.div}>본캐 맞춤 추천 질문</div>
                                        <div className={styles.div1}>오늘 17:28 / 칸데르니아 (본캐) 기준</div>
                                    </div>
                                </div>
                                <div className={styles.list}>
                                    <div className={styles.inPageNavigationAtomic}>
                                        <div className={styles.inPageNavigationAtomic1}>
                                            <div className={styles.div2}>1</div>
                                        </div>
                                        <div className={styles.div3}>230레벨 이후 사냥터 추천</div>
                                    </div>
                                    <div className={styles.inPageNavigationAtomic}>
                                        <div className={styles.inPageNavigationAtomic1}>
                                            <div className={styles.div2}>2</div>
                                        </div>
                                        <div className={styles.div3}>캐릭터 레벨업이 느려진 이유는 무엇 때문인가요?</div>
                                    </div>
                                    <div className={styles.inPageNavigationAtomic}>
                                        <div className={styles.inPageNavigationAtomic1}>
                                            <div className={styles.div2}>3</div>
                                        </div>
                                        <div className={styles.div3}>링크 스킬과 유니온이 뭔가요?</div>
                                    </div>
                                    <div className={styles.inPageNavigationAtomic6}>
                                        <div className={styles.inPageNavigationAtomic7}>
                                            <div className={styles.div8}>4</div>
                                        </div>
                                        <div className={styles.div3}>무자본 스킬트리 추천</div>
                                    </div>
                                    <div className={styles.inPageNavigationAtomic6}>
                                        <div className={styles.inPageNavigationAtomic7}>
                                            <div className={styles.div8}>5</div>
                                        </div>
                                        <div className={styles.div3}>소과금으로 효율적인 육성하는 방법</div>
                                    </div>
                                </div>
                            </div>}
                        <div className={styles.inPageNavigationSmall1}>
                            <div className={styles.wrapTitle}>
                                <div className={styles.icon}>
                                    <Image className={styles.iconChild} width={11.7} height={11.7} sizes="100vw" alt=""
                                           src="/icons/search.svg"/>
                                </div>
                                <div className={styles.title2}>
                                    <div className={styles.div}>유저들이 자주 하는 질문</div>
                                </div>
                            </div>
                            <div className={styles.list}>
                                <div className={styles.inPageNavigationAtomic}>
                                    <div className={styles.inPageNavigationAtomic1}>
                                        <div className={styles.div2}>1</div>
                                    </div>
                                    <div className={styles.div3}>230레벨 이후 사냥터 추천</div>
                                </div>
                                <div className={styles.inPageNavigationAtomic}>
                                    <div className={styles.inPageNavigationAtomic1}>
                                        <div className={styles.div2}>2</div>
                                    </div>
                                    <div className={styles.div3}>캐릭터 레벨업이 느려진 이유는 무엇 때문인가요?</div>
                                </div>
                                <div className={styles.inPageNavigationAtomic}>
                                    <div className={styles.inPageNavigationAtomic1}>
                                        <div className={styles.div2}>3</div>
                                    </div>
                                    <div className={styles.div3}>링크 스킬과 유니온이 뭔가요?</div>
                                </div>
                                <div className={styles.inPageNavigationAtomic6}>
                                    <div className={styles.inPageNavigationAtomic7}>
                                        <div className={styles.div8}>4</div>
                                    </div>
                                    <div className={styles.div3}>무자본 스킬트리 추천</div>
                                </div>
                                <div className={styles.inPageNavigationAtomic6}>
                                    <div className={styles.inPageNavigationAtomic7}>
                                        <div className={styles.div8}>5</div>
                                    </div>
                                    <div className={styles.div3}>소과금으로 효율적인 육성하는 방법</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* 채팅 페이지 (chat) */}
            {pageValue === 'chat' && (
                <>
                    <div className={styles.headerChatbot}>
                        <div className={styles.wrapTitle}>
                            <div className={styles.divChat1}>{currentChatTopic.replace('\n', '')}</div>
                            <button className={styles.buttonChat}>
                                <div className={styles.icon1}>
                                    <Image className={styles.vector4Stroke} width={24} height={24} sizes="100vw" alt=""
                                           src="/icons/arrow_down.svg"/>
                                </div>
                            </button>
                        </div>
                        <div className={styles.wrapBtn}>
                            <div className={styles.buttonChat}>
                                <button onClick={() => handlePageClick('history')} className={styles.icon}>
                                    <Image className={styles.vector2Stroke} width={24} height={24} sizes="100vw" alt=""
                                           src="/icons/history.svg"/>
                                </button>
                            </div>
                            <div className={styles.buttonChat}>
                                <button className={styles.icon}>
                                    <Image className={styles.vector2Stroke} width={24} height={24} sizes="100vw" alt=""
                                           src="/icons/menu.svg"/>
                                </button>
                            </div>
                            <div className={styles.buttonChat}>
                                <button onClick={onClose} className={styles.icon}>
                                    <Image className={styles.vector2Stroke} width={24} height={24} sizes="100vw" alt=""
                                           src="/icons/cancel.svg"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.wrapLog}>
                        {chatHistory.map((message, index) => (
                            <React.Fragment key={message.id}>
                                {/* Date separator */}
                                {(index === 0 || formatDateOnly(chatHistory[index - 1].timestamp) !== formatDateOnly(message.timestamp)) && (
                                    <div className={styles.dateSeparator}>
                                        <div className={styles.timestamp}>{formatDateOnly(message.timestamp)} {formatTimeOnly(message.timestamp)}</div>
                                    </div>
                                )}

                                <div
                                    className={message.type === 'user' ? styles.userMessageWrapper : styles.aiMessageWrapper}
                                >
                                    {message.type === 'user' ? (
                                        // User message
                                        <div className={styles.userInput}>
                                            <div className={styles.div2}>{message.text}</div>
                                            {/*<div className={styles.timestamp}>{formatTimeOnly(message.timestamp)}</div>*/}
                                        </div>
                                    ) : (
                                        // AI message
                                        <div className={styles.divModel}>
                                            <div className={styles.logoMaping}>
                                                <div className={styles.logo}>
                                                    <div className={styles.logoMaping}>
                                                        <Image className={styles.mapingIcon} width={30} height={22} sizes="100vw" alt="" src="/icons/chatbot.svg" />
                                                    </div>
                                                </div>
                                            </div>
                                            {message.pending ? (
                                                <p className={styles.maAi}>메이 AI가 열심히 생각중이에요... 🔍</p>
                                            ) : (
                                                <div className={styles.aiContentAndTimestamp}>
                                                    <div>
                                                        <ReactMarkdown
                                                            remarkPlugins={[remarkGfm]}
                                                            components={{
                                                                li: ({...props}) => (
                                                                    <li {...props} className={styles.p}/>
                                                                ),
                                                                p: ({...props}) => (
                                                                    <p {...props} className={styles.p}/>
                                                                ),
                                                            }}
                                                        >
                                                            {message.text}
                                                        </ReactMarkdown>
                                                    </div>
                                                    {/*<div className={styles.timestamp}>{formatTimeOnly(message.timestamp)}</div>*/}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </React.Fragment>
                        ))}
                        <div ref={chatEndRef}/>
                    </div>
                </>
            )}
            {pageValue === 'history' &&
                <>
                    <div className={styles.headerChatbot}>
                        <div className={styles.wrapTitle}>
                            <button onClick={() => handlePageClick('default')} className={styles.buttonChat}>
                                <div className={styles.icon1}>
                                    <Image className={styles.vector4Stroke} width={24} height={24} sizes="100vw" alt=""
                                           src="/icons/arrow_left.svg"/>
                                </div>
                            </button>
                            <div className={styles.divChat1}>대화 기록 보기</div>
                        </div>
                        <div className={styles.wrapBtn}>
                            <div className={styles.buttonChat}>
                                <button onClick={() => handlePageClick('chat')} className={styles.icon}>
                                    <Image className={styles.vector2Stroke} width={24} height={24} sizes="100vw" alt=""
                                           src="/icons/newchatting.svg"/>
                                </button>
                            </div>
                            <div className={styles.buttonChat}>
                                <button onClick={onClose} className={styles.icon}>
                                    <Image className={styles.vector2Stroke} width={24} height={24} sizes="100vw" alt=""
                                           src="/icons/cancel.svg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    {isLogin ?
                        <div className={styles.wrapLog}>
                            {/*<div className={styles.titleChat}>*/}
                            {/*    <div className={styles.pm}>오늘</div>*/}
                            {/*</div>*/}
                            <div className={styles.log}>
                                {userChatHistory.length > 0 ? (
                                    userChatHistory.map((item) => (
                                        <div key={item.chatId} className={styles.historyAtomic}>
                                            <div onClick={() => handleHistoryItemClick(item.chatId, item.topic)} className={styles.wrapInfoHistory}>
                                                <Image className={styles.iconBlue} width={16} height={16} sizes="100vw" alt=""
                                                       src="/icons/history.svg"/>
                                                <div className={styles.divHistory}>{item.topic.replace('\n', '')}</div>
                                                <div className={styles.divHistory1}>{formatRelativeTime(item.dateTime)}</div>
                                            </div>
                                            <button onClick={() => handleDeleteHistoryItem(item.chatId)} className={styles.deleteButton}>
                                                <div className={styles.iconHistory}>
                                                    <Image className={styles.iconBlue} width={16} height={16} sizes="100vw" alt=""
                                                           src="/icons/delete.svg"/>
                                                </div>
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.infoTextLogin}>
                                        <div className={styles.divLogin}>저장된 대화 기록이 없습니다.</div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.historyAtomic}>
                                <div onClick={() => handlePageClick('chat')} className={styles.wrapItem}>
                                    <div className={styles.wrapInfo}>
                                        <Image className={styles.iconBlue} width={16} height={16} sizes="100vw" alt=""
                                               src="icons/newchatting.svg"/>
                                        <div className={styles.divHistory}>새로운 채팅 시작하기</div>
                                    </div>
                                </div>
                            </div>
                            {/*<div className={styles.div2}>메시지</div>*/}
                            <div ref={chatEndRef}/>
                            {/* 채팅 맨 아래로 스크롤하기 위한 마커 */}
                        </div>:
                        <div className={styles.wrapLog}>
                            <div className={styles.titleChat}>
                                <div className={styles.pm}>오늘</div>
                            </div>
                            <div className={styles.log}>
                                <div className={styles.infoTextLogin}>
                                    <div className={styles.iconBlue}>
                                        <Image className={styles.iconChildBlue} width={16} height={16} sizes="100vw" alt=""
                                               src="/icons/blue_mark.svg"/>
                                    </div>
                                    <div className={styles.divLogin}>대화 기록을 저장하려면 로그인이 필요해요</div>
                                </div>
                                <Link href='/login' className={styles.buttonLogin}>
                                    <div className={styles.divLogin}>로그인</div>
                                </Link>
                            </div>
                            <div className={styles.historyAtomic}>
                                <div onClick={() => handlePageClick('chat')} className={styles.wrapItem}>
                                    <div className={styles.wrapInfo}>
                                        <Image className={styles.iconBlue} width={16} height={16} sizes="100vw" alt=""
                                               src="icons/newchatting.svg"/>
                                        <div className={styles.divHistory}>새로운 채팅 시작하기</div>
                                    </div>
                                </div>
                            </div>
                            {/*<div className={styles.div2}>메시지</div>*/}
                            <div ref={chatEndRef}/>
                            {/* 채팅 맨 아래로 스크롤하기 위한 마커 */}
                        </div>}
                </>
            }

            {/* 하단 입력창 (페이지 값에 따라 조건부 렌더링) */}
            {(pageValue === 'chat' || pageValue === 'default') && (
                <div className={styles.textInput4}>
                    <div className={styles.textInputChatbot}>
                        {styles.halo && <div className={styles.halo}/>}
                        <div className={styles.textInput5}>
                            <div className={styles.textActive}>
                                <input
                                    type="text"
                                    className={styles.actualChatInput}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder='내용을 입력하세요'
                                    aria-label="채팅 메시지 입력"
                                />
                            </div>
                            <button
                                type="button"
                                className={styles.icon7}
                                onClick={handleSendMessage}
                                aria-label="전송"
                                disabled={!inputValue.trim()}
                            >
                                <Image
                                    className={styles.iconChild1}
                                    width={24}
                                    height={24}
                                    sizes="100vw"
                                    alt="전송 아이콘"
                                    src="/icons/send_off.svg"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {pageValue === 'history' && (
                <div className={styles.textInput4}>
                    <div className={styles.textInputChatbot}>
                        <div className={styles.textInput51}>
                            <div className={styles.textActive}>
                                <input
                                    type="text"
                                    className={styles.actualChatInput}
                                    // value={inputValue} // 이 값은 검색을 위한 별도의 상태여야 합니다.
                                    // onChange={handleInputChange} // 이 핸들러는 검색을 위한 별도의 핸들러여야 합니다.
                                    // onKeyPress={handleKeyPress} // 이 핸들러는 검색을 위한 별도의 핸들러여야 합니다.
                                    placeholder='찾으려는 대화를 검색해보세요'
                                    aria-label="대화 검색 입력"
                                />
                            </div>
                            <button
                                type="button"
                                className={styles.icon7}
                                // onClick={handleSendMessage} // 이 버튼의 기능은 검색이어야 합니다.
                                // aria-label="전송"
                                // disabled={!inputValue.trim()}
                            >
                                <Image
                                    className={styles.iconChild1}
                                    width={24}
                                    height={24}
                                    sizes="100vw"
                                    alt="검색 아이콘" // alt 텍스트를 명확하게 변경
                                    src="/icons/send_off.svg" // 여기에 검색 아이콘을 고려해 보세요
                                />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* 메뉴 챗봇 (항상 표시되지만 CSS로 숨김 처리 가능) */}
            {pageValue === 'menu' &&
                <div className={styles.menuChatbot}>
                    <div className={styles.container}>
                        <div className={styles.wrap1}>
                            <div className={styles.itemAtomic}>
                                <div className={styles.div23}>크게 보기</div>
                            </div>
                        </div>
                        <div className={styles.wrap1}>
                            <div className={styles.itemAtomic}>
                                <div className={styles.div23}>새로운 대화</div>
                            </div>
                            <div className={styles.itemAtomic}>
                                <div className={styles.div23}>대화 기록 보기</div>
                            </div>
                        </div>
                        <div className={styles.itemAtomic3}>
                            <div className={styles.div23}>구독 설정</div>
                        </div>
                    </div>
                    <div className={styles.wrapInfo}>
                        <div className={styles.maAi10}>MA-AI 1.0</div>
                        <div className={styles.maAi10}>무료 모델 구독 중</div>
                        <div className={styles.maAi10}>마지막 업데이트 : 1시간 전</div>
                    </div>
                </div>}
        </div>
    );
};

export default ChatBot;