import React from "react";

export const Input = ({
  type,
  placeholder,
  className,
  onChange,
  required,
  value,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      required={required}
      value={value}
    />
  );
};
