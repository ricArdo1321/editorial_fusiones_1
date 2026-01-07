'use client';

import React, { useState } from 'react';

const HalftoneDot: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-64 h-64 flex items-center justify-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The base dot */}
      <div
        className={`w-8 h-8 bg-brand rounded-full transition-all duration-500 ease-out z-10 ${isHovered ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          }`}
      />

      {/* The explosion */}
      <div
        className={`absolute inset-0 bg-halftone-pattern bg-[length:12px_12px] rounded-full transition-all duration-700 ease-out mix-blend-screen ${isHovered ? 'scale-100 opacity-100 rotate-12' : 'scale-0 opacity-0 rotate-0'
          }`}
        style={{
          maskImage: 'radial-gradient(circle, black 50%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 70%)'
        }}
      />

      {/* Secondary ring */}
      <div
        className={`absolute inset-0 border border-brand/30 rounded-full transition-all duration-1000 ease-out delay-75 ${isHovered ? 'scale-110 opacity-100' : 'scale-0 opacity-0'
          }`}
      />
    </div>
  );
};

export default HalftoneDot;