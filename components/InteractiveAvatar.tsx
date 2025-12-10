import React, { useEffect, useRef, useState } from 'react';

const InteractiveAvatar: React.FC = () => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const distance = Math.min(
        10,
        Math.hypot(e.clientX - centerX, e.clientY - centerY) / 10
      );

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      setEyePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center animate-float transition-all duration-300"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-github-accent/20 rounded-full blur-3xl scale-90 animate-pulse" />

      {/* Robot SVG */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-2xl filter"
        style={{ overflow: 'visible' }}
      >
        {/* Antenna */}
        <line x1="100" y1="50" x2="100" y2="20" stroke="#8b949e" strokeWidth="4" />
        <circle cx="100" cy="20" r="6" fill="#2f81f7" className="animate-ping" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <circle cx="100" cy="20" r="6" fill="#2f81f7" />

        {/* Head Shape */}
        <rect
          x="40"
          y="50"
          width="120"
          height="100"
          rx="20"
          className="fill-github-light-subtle dark:fill-[#161b22] stroke-github-accent"
          strokeWidth="3"
        />

        {/* Face Screen */}
        <rect
          x="55"
          y="70"
          width="90"
          height="60"
          rx="10"
          className="fill-[#0d1117]"
        />

        {/* Eyes Group */}
        <g transform={`translate(${eyePosition.x}, ${eyePosition.y})`}>
          {/* Left Eye */}
          <g transform="translate(75, 100)">
            <ellipse rx="12" ry="12" fill="#2f81f7" opacity="0.3" />
            <circle r="6" fill="#2f81f7" />
            <circle r="2" fill="white" transform="translate(2, -2)" />
          </g>
          
          {/* Right Eye */}
          <g transform="translate(125, 100)">
            <ellipse rx="12" ry="12" fill="#2f81f7" opacity="0.3" />
            <circle r="6" fill="#2f81f7" />
            <circle r="2" fill="white" transform="translate(2, -2)" />
          </g>
        </g>

        {/* Mouth/Voice Line - Simple animated sine wave visualization */}
        <path
           d="M 85 145 Q 92 145, 100 145 Q 108 145, 115 145"
           stroke="#2f81f7"
           strokeWidth="2"
           strokeLinecap="round"
           fill="none"
           className="opacity-50"
        />

        {/* Neck */}
        <rect x="85" y="150" width="30" height="20" fill="#30363d" />
        
        {/* Shoulders Hint */}
        <path d="M 60 170 Q 100 190 140 170 L 140 200 L 60 200 Z" fill="#21262d" opacity="0.8" />
      </svg>
      
      {/* Floating CSS Animation Definition */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default InteractiveAvatar;