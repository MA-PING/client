'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) {
        return null;
    }

    // 클라이언트 사이드에서만 document에 접근하도록 보장
    const portalRoot = document.getElementById('portal-root');
    if (!portalRoot) {
        // portal-root가 없는 경우를 대비하여 body에 직접 추가
        return createPortal(children, document.body);
    }

    return createPortal(children, portalRoot);
};

export default Portal;