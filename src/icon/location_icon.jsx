import React from "react";

export const Location = ({ onClick }) => {
  return (
    <i
      className="fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white"
      aria-hidden="true"
      onClick={onClick}
    ></i>
  );
};
