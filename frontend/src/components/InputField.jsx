import React from 'react';

const InputField = ({ label, type = 'text', value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-medium text-orange-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  );
};

export default InputField;
