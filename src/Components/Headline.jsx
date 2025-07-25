import React, { useEffect } from 'react';

const Headline = () => {
  const data = {
    title: '🚧 This website is still updating — Stay tuned for latest features and announcements!'
  };

  // Marquee effect with soft animation
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes softMarquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }

      .marquee {
        display: inline-block;
        white-space: nowrap;
        animation: softMarquee 20s linear infinite;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-yellow-50 to-yellow-100 border-y border-yellow-300 overflow-hidden shadow-sm">
      <div className="marquee py-3 px-6">
        <span className="text-base md:text-lg font-medium text-yellow-800 tracking-wide">{data.title}</span>
      </div>
    </div>
  );
};

export default Headline;
