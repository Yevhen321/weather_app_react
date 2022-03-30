import React from "react";

export const Input = ({ type, placeholder, className, onChange, required }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      required={required}
    />
  );
};
