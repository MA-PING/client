'use client'
import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    targetId?: string; // 옵션: 포탈을 삽입할 특정 DOM 요소의 ID
}

const Portal: React.FC<PortalProps> = ({ children, targetId }) => {
    const [mounted, setMounted] = useState(false);
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setMounted(true);
        let targetElement: HTMLElement | null = null;

        if (targetId) {
            targetElement = document.getElementById(targetId);
            if (!targetElement) {
                console.warn(`ID가 "${targetId}"인 포탈 대상을 찾을 수 없습니다. document.body를 기본값으로 사용합니다.`);
            }
        }

        setPortalRoot(targetElement || document.body); // 기본값으로 document.body 사용

        return () => {
            setMounted(false);
        };
    }, [targetId]);

    if (!mounted || !portalRoot) {
        return null; // 서버 사이드 또는 포탈 루트가 준비되기 전에는 아무것도 렌더링하지 않음
    }

    return createPortal(children, portalRoot);
};

export default Portal;