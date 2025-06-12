import type {NextPage} from 'next';
import Image from "next/image";
import styles from '@/styles/chat/chatBot.module.css';
import Button from "@mui/material/Button";
import {useState} from "react";
// import {ApiResponse} from "@/interfaces/character";
//
// async function getNoLoginChatMessage(data: string): Promise<ApiResponse | null> {
//     try {
//
//         const response = await fetch('https://api.ma-ping.com/api/v1/ai/chat/stream/guest', {
//             next: {
//                 revalidate: 0, // 2분
//             },
//         });
//         if (!response.ok) {
//             return null;
//         }
//         const data: ApiResponse = await response.json();
//         if (!data || !data.data) {
//             return null;
//         }
//         return data;
//     } catch (error) {
//         console.error('캐릭터 정보 가져오기 오류:', error);
//         return null;
//     }
// }

interface ChatBotProps {
    onClose: () => void
}

const ChatBot: NextPage<ChatBotProps> = ({onClose}) => {
    const [inputValue, setInputValue] = useState(''); // 입력창의 텍스트 상태
    const [pageValue, setPageValue] = useState<string>('default'); // default, chat, history
    // 입력창 내용 변경 핸들러
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    // const handlePageClick = (page: string) => {
    //     setPageValue(page);
    // };
    const handleSendMessage = () => {
        const message = inputValue.trim(); // 앞뒤 공백 제거
        if (message === '') return; // 빈 메시지는 전송하지 않음

        console.log('Sending message:', message); // 실제 전송 로직 대신 콘솔에 출력
        // TODO: 실제 메시지 전송 로직을 여기에 구현합니다.
        // 예: 부모 컴포넌트로부터 받은 onSendMessage 함수 호출
        // if (onSendMessage) {
        //   onSendMessage(message);
        // }
        setPageValue('chat');
        setInputValue(''); // 메시지 전송 후 입력창 비우기
    };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) { // Shift+Enter는 줄바꿈으로 동작할 수 있도록 제외 (textarea의 경우)
            event.preventDefault(); // 기본 동작(예: 폼 제출) 방지
            setPageValue('chat');
            handleSendMessage();
        }
    };

    return (
        <div className={styles.statusdefaultTypesmallLo}>
            {pageValue === 'default' && <>
                <div className={styles.content}>
                <div className={styles.title}>
                    <div className={styles.ai}>당신에게 딱 맞는 메이플 길라잡이 메이 AI에요. 무엇을 도와드릴까요?</div>
                </div>
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
                </div>
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
            <div className={styles.headerChatbot}>
                <div className={styles.wrapFilter}>
                    <div className={styles.button}>
                        {/*<div className={styles.icon}>*/}
                        {/*    <Image className={styles.vector39Stroke} width={11.7} height={1} sizes="100vw" alt=""*/}
                        {/*           src="Vector 39 (Stroke).svg"/>*/}
                        {/*    <Image className={styles.vector40Stroke} width={11.7} height={1} sizes="100vw" alt=""*/}
                        {/*           src="Vector 40 (Stroke).svg"/>*/}
                        {/*    <Image className={styles.vector41Stroke} width={11.7} height={1} sizes="100vw" alt=""*/}
                        {/*           src="Vector 41 (Stroke).svg"/>*/}
                        {/*    <Image className={styles.ellipse31Stroke} width={3.7} height={3.7} sizes="100vw" alt=""*/}
                        {/*           src="Ellipse 31 (Stroke).svg"/>*/}
                        {/*    <Image className={styles.ellipse32Stroke} width={3.7} height={3.7} sizes="100vw" alt=""*/}
                        {/*           src="Ellipse 32 (Stroke).svg"/>*/}
                        {/*</div>*/}
                        <div className={styles.ai}>검색필터</div>
                    </div>
                    <Image className={styles.dividerIcon} width={0} height={18} sizes="100vw" alt="" src="/icons/divider.png" />
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
                <div className={styles.wrapIcon}>
                    <div className={styles.buttonChat}>
                        <div className={styles.icon}>
                            <Image className={styles.vector2Stroke} width={24} height={24}  sizes="100vw" alt=""
                                   src="/icons/gray_question_mark.svg"/>
                        </div>
                    </div>
                    <div className={styles.bubuttonChattton}>
                        <div className={styles.icon}>
                            <Image className={styles.vector2Stroke} width={24} height={24} sizes="100vw" alt=""
                                   src="/icons/history.svg"/>
                        </div>
                    </div>
                    <div className={styles.buttonChat}>
                        <div className={styles.icon}>
                            <Image className={styles.vector2Stroke} width={24} height={24}sizes="100vw" alt=""
                                   src="/icons/menu.svg"/>
                        </div>
                    </div>
                    <div className={styles.buttonChat}>
                        <Button onClick={onClose} className={styles.icon}>
                            <Image className={styles.vector2Stroke} width={24} height={24} sizes="100vw" alt=""
                                   src="/icons/cancel.svg"/>
                        </Button>
                    </div>
                </div>
            </div>
                <div className={styles.statusdefaultTypesmallLoChild}/>
                <div className={styles.statusdefaultTypesmallLoItem}/>
                <div className={styles.statusdefaultTypesmallLoInner}/>
                <div className={styles.rectangleDiv}/>
                <div className={styles.textInput4}>
                    <div className={styles.textInputChatbot}>
                        {/* styles.halo 클래스가 실제로 스타일에 정의되어 있고 항상 표시되어야 한다면 이 조건부는 필요 없습니다. */}
                        {styles.halo && <div className={styles.halo} />}
                        <div className={styles.textInput5}>
                            <div className={styles.textActive}> {/* 실제 input 요소를 감싸는 div */}
                                <input
                                    type="text"
                                    className={styles.actualChatInput} /* input 요소 자체를 위한 새 클래스 또는 기존 스타일 적용 */
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress} // Enter 키 입력 감지
                                    placeholder='내용을 입력하세요'
                                    aria-label="채팅 메시지 입력"
                                />
                            </div>
                            {/* 전송 버튼: div 대신 button 태그 사용 권장 */}
                            <button
                                type="button"
                                className={styles.icon7} // 사용자가 제공한 클래스명 (스타일 조정 필요할 수 있음)
                                onClick={handleSendMessage}
                                aria-label="전송"
                                disabled={!inputValue.trim()} // 입력 값이 없을 때 버튼 비활성화
                            >
                                <Image
                                    className={styles.iconChild1} // 사용자가 제공한 클래스명
                                    width={24}
                                    height={24}
                                    sizes="100vw" // sizes="100vw"는 일반적으로 전체 너비 이미지에 사용, 아이콘에는 불필요할 수 있음
                                    alt="전송 아이콘"
                                    src="/icons/send_off.svg" // 동적 아이콘 경로
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </>}
            {pageValue === 'chat' &&
                <>
                    <div className={styles.statuschattingTypesmallLChild} />
                    <div className={styles.statuschattingTypesmallLItem} />
                    <div className={styles.statuschattingTypesmallLInner} />
                    <div className={styles.rectangleDiv} />
                    <div className={styles.textInputChat}>
                        <div className={styles.textInputChatbot}>
                            <div className={styles.textInputChat1}>
                                <div className={styles.textActive}> {/* 실제 input 요소를 감싸는 div */}
                                    <input
                                        type="text"
                                        className={styles.actualChatInput} /* input 요소 자체를 위한 새 클래스 또는 기존 스타일 적용 */
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress} // Enter 키 입력 감지
                                        placeholder='내용을 입력하세요'
                                        aria-label="채팅 메시지 입력"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className={styles.icon} // 사용자가 제공한 클래스명 (스타일 조정 필요할 수 있음)
                                    onClick={handleSendMessage}
                                    aria-label="전송"
                                    disabled={!inputValue.trim()} // 입력 값이 없을 때 버튼 비활성화
                                >
                                    <Image
                                        className={styles.iconChildChat} // 사용자가 제공한 클래스명
                                        width={24}
                                        height={24}
                                        sizes="100vw" // sizes="100vw"는 일반적으로 전체 너비 이미지에 사용, 아이콘에는 불필요할 수 있음
                                        alt="전송 아이콘"
                                        src="/icons/send_off.svg" // 동적 아이콘 경로
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.headerChatbot}>
                        <div className={styles.wrapTitle}>
                            <div className={styles.divChat1}>이전에 나눈 대화 내용이 요약된 제목</div>
                            <Button className={styles.buttonChat}>
                                <div className={styles.icon1}>
                                    <Image className={styles.vector4Stroke} width={24} height={24} sizes="100vw" alt="" src="/icons/arrow_down.svg" />
                                </div>
                            </Button>
                        </div>
                        <div className={styles.wrapBtn}>
                            <div className={styles.buttonChat}>
                                <div className={styles.icon}>
                                    <Image className={styles.vector2Stroke} width={24} height={24} sizes="100vw" alt=""
                                           src="/icons/history.svg"/>
                                </div>
                            </div>
                            <div className={styles.buttonChat}>
                                <div className={styles.icon}>
                                    <Image className={styles.vector2Stroke} width={24} height={24}sizes="100vw" alt=""
                                           src="/icons/menu.svg"/>
                                </div>
                            </div>
                            <div className={styles.buttonChat}>
                                <Button onClick={onClose} className={styles.icon}>
                                    <Image className={styles.vector2Stroke} width={24} height={24} sizes="100vw" alt=""
                                           src="/icons/cancel.svg"/>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.wrapLog}>
                        <div className={styles.textInputChatbot}>
                            <div className={styles.title}>
                                <div className={styles.pm}>어제 07:00 PM</div>
                            </div>
                        </div>
                        <div className={styles.log}>
                            <div className={styles.userInput}>
                                <div className={styles.div2}>250레벨부터 데몬어벤저를 어떻게 키우면 좋을까?</div>
                            </div>
                            <div className={styles.hpContainer}>
                                <p className={styles.p}>250레벨 이후 데몬어벤저 육성법에 대해서 찾아보았어요.</p>
                                <ul className={styles.hp}>
                                    <li>
                                        <span>{`데몬어벤저는 HP를 활용한 독특한 전투 스타일로, 적절한 육성 방법과 스탯 관리가 필요합니다. 하이퍼버닝과 효율적인 사냥터 선택을 통해 빠르게 레벨업할 수 있으며, 전투력과 생존력을 동시에 강화하는 것이 중요합니다. 이러한 방법들을 통해 데몬어벤저를 효과적으로 육성할 수 있습니다. `}</span>
                                        <span className={styles.span}>나무위키</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.scroller}>
                        <div className={styles.scrollerChild} />
                    </div>
                </>
            }
            <div className={styles.scroller}>
                <div className={styles.scrollerChild}/>
            </div>
            <div className={styles.menuChatbot}>
                <div className={styles.container}>
                    <div className={styles.wrap1}>
                        <div className={styles.itemAtomic}>
                            {/*<Image className={styles.icon} width={16} height={16} sizes="100vw" alt="" src="icon.svg"/>*/}
                            <div className={styles.div23}>크게 보기</div>
                        </div>
                    </div>
                    <div className={styles.wrap1}>
                        <div className={styles.itemAtomic}>
                            {/*<Image className={styles.icon} width={16} height={16} sizes="100vw" alt="" src="icon.svg"/>*/}
                            <div className={styles.div23}>새로운 대화</div>
                        </div>
                        <div className={styles.itemAtomic}>
                            {/*<Image className={styles.icon} width={16} height={16} sizes="100vw" alt="" src="icon.svg"/>*/}
                            <div className={styles.div23}>대화 기록 보기</div>
                        </div>
                    </div>
                    <div className={styles.itemAtomic3}>
                        {/*<Image className={styles.icon} width={16} height={16} sizes="100vw" alt="" src="icon.svg"/>*/}
                        <div className={styles.div23}>구독 설정</div>
                    </div>
                </div>
                <div className={styles.wrapInfo}>
                    <div className={styles.maAi10}>MA-AI 1.0</div>
                    <div className={styles.maAi10}>무료 모델 구독 중</div>
                    <div className={styles.maAi10}>마지막 업데이트 : 1시간 전</div>
                </div>
            </div>
        </div>);
};

export default ChatBot;
