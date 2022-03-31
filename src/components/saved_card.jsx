import React from "react";
import moment from "moment";
import { Button } from "../common/button";
import { FiXCircle } from "react-icons/fi";

export const SavedCard = ({ day, deleteSavedCard }) => {
  let day_icon = `${
    process.env.REACT_APP_ICON + day.list[0].weather[0]["icon"]
  }@2x.png`;
  return (
    <li className="container relative p-4 flex flex-col items-center justify-center bg-gray-200 rounded-lg my-auto mr-1 h-full">
      <h4 className="text-2xl text-gray-800 mt-auto mb-4">
        {day.city.name}, {day.city.country}
      </h4>
      <div className="my-auto">
        <p className="font-bold text-3xl text-pink-600 mb-2">
          {Math.round(day.list[0].main.temp)}&deg;C
        </p>
        <p className="text-2xl text-gray-800 tracking-widest">
          {day.list[0].weather[0].main}
          <img src={day_icon} className="w-1/4 inline" alt="img" />
        </p>
        <p className="text-gray-400 text-xs uppercase tracking-widest">
          {day.list[0].weather[0].description}
        </p>
        <p className="tracking-wider">
          {moment(day.list[0].dt_txt).format("dddd hh:mm")}am
        </p>
      </div>
      <Button onClick={deleteSavedCard} className="absolute top-0 right-0">
        <FiXCircle className="w-6 h-6" />
      </Button>
    </li>
  );
};
