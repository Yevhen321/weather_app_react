import React from "react";

export const ForecastForm = ({ children }) => {
  return (
    <div className="flex w-3/4 min-h-full rounded-3xl shadow-lg m-auto bg-gray-100">
      {children}
    </div>
  );
};
