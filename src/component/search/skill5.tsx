// 기존 Skill5 컴포넌트 파일 (예: src/component/search/Skill5.tsx)
import type { NextPage } from 'next';
import styles from '../../styles/search/skill.module.css';
import Image from "next/image";
import { Skill, SkillInfo } from "@/interfaces/character";
import { useState, useRef, MouseEvent as ReactMouseEvent, useEffect } from "react"; // useRef, ReactMouseEvent, useEffect 추가
import SkillDetailInfo from "@/component/search/skillInfo";
import Portal from '@/component/Portal';
import Sol from "@/component/search/sol"; // 필요시 경로 조정

interface Skill5Props {
    skill: Skill;
}

const Skill5: NextPage<Skill5Props> = ({ skill }) => {
    const [hoveredSkill, setHoveredSkill] = useState<SkillInfo | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null); // 마우스 아웃 시 딜레이를 위한 ref

    // 컴포넌트 언마운트 시 타임아웃 정리
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    if (skill.character_skill_grade === null) {
        return (
            <div className={styles.noWrapLink}>
                <div className={styles.noStatusIndicator}>
                    <div className={styles.noIcon}>
                        <Image className={styles.noIconChild} width={17} height={17} alt="" src="/icons/CircleWarning.svg" />
                    </div>
                    <div className={styles.noLabel}>스킬을 보유하고있지 않아요</div>
                </div>
            </div>
        );
    }

    const handleMouseEnter = (skillInfo: SkillInfo, event: ReactMouseEvent<HTMLDivElement>) => {
        if (hoverTimeoutRef.current) { // 기존 숨김 타이머가 있다면 제거
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }

        setHoveredSkill(skillInfo);

        // 위치 계산
        const rect = event.currentTarget.getBoundingClientRect(); // 현재 마우스가 올라간 요소의 위치 정보
        setTooltipPosition({
            top: rect.bottom + window.scrollY + 5, // 아이템 하단 + 페이지 스크롤 값 + 5px 여백
            left: rect.left + window.scrollX + rect.width / 2, // 아이템 왼쪽 + 페이지 스크롤 값 + 아이템 너비의 절반 (중앙 정렬 위함)
        });
    };

    const handleMouseLeave = () => {
        // 툴팁으로 마우스를 옮길 시간을 벌기 위해 약간의 딜레이 후 숨김
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredSkill(null);
            setTooltipPosition(null);
        }, 150); // 딜레이 시간 (밀리초 단위), 필요에 따라 조절 (예: 100-200ms)
    };

    // 툴팁 자체에 마우스가 들어갔을 때
    const handleTooltipMouseEnter = () => {
        if (hoverTimeoutRef.current) { // 숨김 타이머가 있다면 제거 (툴팁이 사라지지 않도록)
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
    };

    // 툴팁에서 마우스가 벗어났을 때
    const handleTooltipMouseLeave = () => {
        // 툴팁을 떠나면 다시 숨김 타이머 설정
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredSkill(null);
            setTooltipPosition(null);
        }, 150);
    };


    return (
        <>
            {skill.character_skill_grade === '6' &&
                <Sol/>
            }
            <div className={styles.wrapLink}>
                {/* 'skill' 변수명 충돌을 피하기 위해 'charSkill'로 변경 */}
                {skill.character_skill.map(charSkill => (
                    <div
                        key={charSkill.skill_name}
                        onMouseEnter={(e) => handleMouseEnter(charSkill, e)}
                        onMouseLeave={handleMouseLeave}
                        className={styles.item}
                    >
                        <div className={styles.wrapSkill}>
                            <Image className={styles.imgSkill5Icon} width={40} height={40} alt={charSkill.skill_name} src={charSkill.skill_icon} />
                            <div className={styles.div2}>{charSkill.skill_name}</div>
                        </div>
                        <div className={styles.badge}>
                            <div className={styles.label}>{charSkill.skill_level}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* hoveredSkill과 tooltipPosition이 있을 때만 Portal과 SkillDetailInfo 렌더링 */}
            {hoveredSkill && tooltipPosition && (
                <Portal>
                    <div
                        style={{
                            position: 'absolute', // 절대 위치 사용
                            top: `${tooltipPosition.top}px`,
                            left: `${tooltipPosition.left}px`,
                            transform: 'translateX(-50%)', // X축 기준으로 -50% 이동하여 가로 중앙 정렬 (left 값이 요소의 중앙을 가리킬 때)
                            zIndex: 1050, // 다른 요소들 위에 표시되도록 z-index 설정
                            // 여기에 툴팁 컨테이너 스타일 추가:
                            // background: 'white',
                            // border: '1px solid #ccc',
                            // padding: '10px',
                            // borderRadius: '4px',
                            // boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        }}
                        onMouseEnter={handleTooltipMouseEnter} // 마우스가 툴팁 안으로 들어가면 계속 표시
                        onMouseLeave={handleTooltipMouseLeave} // 마우스가 툴팁을 떠나면 숨김
                    >
                        <SkillDetailInfo skill={hoveredSkill} />
                    </div>
                </Portal>
            )}
        </>
    );
};

export default Skill5;