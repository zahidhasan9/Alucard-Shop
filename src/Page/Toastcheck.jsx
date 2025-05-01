import React from 'react';
import { toast } from 'react-hot-toast';

const ToastTestButton = () => {
  const handleClick = () => {
    toast.success('✅ Toast is working perfectly!');
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: '10px 20px',
        backgroundColor: '#22c55e',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      Show Toast
    </button>
  );
};

export default ToastTestButton;
