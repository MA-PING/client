import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/linkSkill.module.css'; // 이 파일의 CSS 모듈을 사용합니다.
import {SkillInfo} from "@/interfaces/character";
import { useState, useRef, MouseEvent as ReactMouseEvent, useEffect } from "react"; // 필요한 훅과 타입 추가
import SkillDetailInfo from "@/component/search/skillInfo"; // SkillDetailInfo 컴포넌트 임포트
import Portal from '@/component/Portal'; // Portal 컴포넌트 임포트 (경로를 확인해주세요)


interface SkillLinkPresetProps {
    skill: SkillInfo[]; // props는 SkillInfo 배열입니다.
}

const SkillLinkPreset: NextPage<SkillLinkPresetProps> = ({skill}) => {
    const [hoveredSkill, setHoveredSkill] = useState<SkillInfo | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 컴포넌트 언마운트 시 타임아웃 정리
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    // skill 배열이 비어있거나 첫 번째 요소가 undefined인 경우 (더 안전하게 skill.length === 0 으로 확인)
    if (!skill || skill.length === 0 || skill[0] === undefined) {
        return(
            <div className={styles.noWrapLink}>
                <div className={styles.noStatusIndicator}>
                    <div className={styles.noIcon}>
                        <Image className={styles.noIconChild} width={17} height={17} alt="경고 아이콘" src="/icons/CircleWarning.svg" />
                    </div>
                    <div className={styles.noLabel}>링크스킬을 보유하고있지 않아요</div>
                </div>
            </div>
        );
    }

    const handleMouseEnter = (currentSkill: SkillInfo, event: ReactMouseEvent<HTMLDivElement>) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }

        setHoveredSkill(currentSkill);

        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipPosition({
            top: rect.bottom + window.scrollY + 5,
            left: rect.left + window.scrollX + rect.width / 2,
        });
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredSkill(null);
            setTooltipPosition(null);
        }, 150);
    };

    const handleTooltipMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
    };

    const handleTooltipMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredSkill(null);
            setTooltipPosition(null);
        }, 150);
    };

    return (
        <>
            <div className={styles.wrapLink}>
                {skill.map(s => (
                    <div
                        key={s.skill_name}
                        className={styles.item}
                        onMouseEnter={(e) => handleMouseEnter(s, e)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className={styles.wrapSkill}>
                            {/* Image alt 속성에 스킬 이름 추가 */}
                            <Image className={styles.imgSkill5Icon} width={40} height={40} alt={s.skill_name} src={s.skill_icon}/>
                            <div className={styles.div}>{s.skill_name}</div>
                        </div>
                        <div className={styles.badge}>
                            <div className={styles.label}>{s.skill_level}</div>
                        </div>
                    </div>
                ))}
            </div>

            {hoveredSkill && tooltipPosition && (
                <Portal>
                    <div
                        style={{
                            position: 'absolute',
                            top: `${tooltipPosition.top}px`,
                            left: `${tooltipPosition.left}px`,
                            transform: 'translateX(-50%)',
                            zIndex: 1050,
                            // 필요하다면 여기에 툴팁 컨테이너 공통 스타일 추가
                            // 예: background: 'rgba(0,0,0,0.8)', color: 'white', padding: '8px', borderRadius: '4px'
                        }}
                        onMouseEnter={handleTooltipMouseEnter}
                        onMouseLeave={handleTooltipMouseLeave}
                    >
                        {/* SkillDetailInfo에 hoveredSkill 전달 */}
                        <SkillDetailInfo skill={hoveredSkill} />
                    </div>
                </Portal>
            )}
        </>
    );
};

export default SkillLinkPreset;