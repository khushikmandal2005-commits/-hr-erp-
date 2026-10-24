import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = ({ children }) => {
  // 35 animated floating bubbles / glowing orb particles
  const bubbleCount = 35;
  const bubbles = Array.from({ length: bubbleCount });

  return (
    <div className="relative min-h-screen w-full bg-[#F8FAFC] overflow-x-hidden font-sans text-slate-800">
      {/* Background Animated Layer */}
      <div className="animated-bg" aria-hidden="true">
        {/* Soft Ambient Radial Blur Blobs */}
        <div className="gradient-blob blob-one" />
        <div className="gradient-blob blob-two" />
        <div className="gradient-blob blob-three" />
        <div className="gradient-blob blob-four" />

        {/* Floating Glowing Bubbles */}
        <div className="particles">
          {bubbles.map((_, i) => (
            <div key={i} className={`particle particle-${i}`} />
          ))}
        </div>

        {/* Subtle Dots Grid Overlay */}
        <div className="grid-overlay" />

        {/* Concentric Dashed Glow Rings */}
        <div className="circle-ring ring-one" />
        <div className="circle-ring ring-two" />

        {/* Moving Light Wave Streaks */}
        <div className="moving-lines">
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Foreground Interactive Page Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">{children}</div>
    </div>
  );
};

export default AnimatedBackground;