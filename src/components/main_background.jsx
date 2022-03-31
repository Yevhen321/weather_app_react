import React from "react";

export const MainBackground = ({ children }) => {
  return (
    <div className="bg-gray-800 flex items-center justify-center w-screen py-10 h-full">
      {children}
    </div>
  );
};
