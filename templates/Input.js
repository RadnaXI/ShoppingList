import React from 'react';

const Input = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="py-2 px-4 rounded-lg placeholder-black bg-slate-400 hover:bg-slate-600 focus:ring-2 focus:ring-slate-500 transition-all duration-300 w-full max-w-md"
    />
  );
};

export default Input;