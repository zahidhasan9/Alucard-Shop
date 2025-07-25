import React, { useEffect } from 'react';

const Headline = () => {
  const data = {
    title: '🚧 This website is still updating — Stay tuned for latest features and announcements!'
  };

  // Marquee effect using custom CSS added to head (only once)
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }

      .marquee {
        display: inline-block;
        white-space: nowrap;
        animation: marquee 15s linear infinite;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="w-full bg-yellow-100 border-t-2 border-b-2 border-yellow-400 overflow-hidden">
      <div className="marquee py-2 px-4">
        <span className="text-md md:text-lg font-semibold text-yellow-700">{data.title}</span>
      </div>
    </div>
  );
};

export default Headline;
