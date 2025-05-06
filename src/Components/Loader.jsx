import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="relative w-20 h-20">
        {/* Outer Spinning Border */}
        <div className="absolute inset-0 border-4 border-yellow-400 border-dashed rounded-full animate-spin shadow-yellow-500/30 shadow-lg"></div>

        {/* Inner Pulsing Circle */}
        <div className="absolute inset-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>

        {/* Core Circle */}
        <div className="absolute inset-4  rounded-full border-2 border-yellow-400"></div>
      </div>
    </div>
  );
};

export default Loader;
