import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 rounded-lg bg-slate-400 hover:bg-slate-600 focus:ring-2 focus:ring-slate-500 transition-all duration-300"    >
      {text}
    </button>
  );
};

export default Button;