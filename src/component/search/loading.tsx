// src/component/loading.tsx
import React from 'react';

export default function Loading() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', minHeight: '200px', marginTop: '100px' }}>
            <svg width="48" height="48" stroke="#007bff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {/* SVG 내부에 직접 스타일을 정의하는 대신 CSS 클래스를 사용하거나,
            React의 style prop을 사용할 수 있지만, SVG 애니메이션은 <style> 태그가 더 일반적입니다.
            JSX에서 <style> 태그를 사용하려면 dangerouslySetInnerHTML을 사용하거나,
            CSS-in-JS 라이브러리 또는 별도의 CSS 파일로 분리하는 것이 좋습니다.
            여기서는 간결성을 위해 인라인 스타일과 SVG 속성을 사용합니다.
        */}
                <style>
                    {`
            .spinner_V8m1 {
              transform-origin: center;
              animation: spinner_zKoa 2s linear infinite;
            }
            .spinner_V8m1 circle {
              stroke-linecap: round;
              animation: spinner_YpZS 1.5s ease-in-out infinite;
            }
            @keyframes spinner_zKoa {
              100% {
                transform: rotate(360deg);
              }
            }
            @keyframes spinner_YpZS {
              0% {
                stroke-dasharray: 0 150;
                stroke-dashoffset: 0;
              }
              47.5% {
                stroke-dasharray: 42 150;
                stroke-dashoffset: -16;
              }
              95%,
              100% {
                stroke-dasharray: 42 150;
                stroke-dashoffset: -59;
              }
            }
          `}
                </style>
                <g className="spinner_V8m1">
                    <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3"></circle>
                </g>
            </svg>
        </div>
    );
}