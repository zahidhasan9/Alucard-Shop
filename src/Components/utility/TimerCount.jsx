import React, { useState, useEffect } from "react";

 const TimerCount = () => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className=" font-Fira shadow-inherit tracking-wider w-[150px] md:w-[198px] font-medium bg-orange-600 text-white text-sm md:text-xl px-3 py-1 rounded">
     ENDS IN: {formatTime(timeLeft)}
  </div>
  )
}
export default TimerCount