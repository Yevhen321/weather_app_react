import React from "react";
import moment from "moment";
import { Button } from "../common/button";
import { IoIosAddCircleOutline } from "react-icons/io";

export const DetailCard = ({ data, icon, onAddWeather }) => {
  return (
    <div className="relative container p-4 flex items-center justify-center shadow-lg rounded-lg bg-white h-1/3 mb-auto">
      <div className="my-auto w-3/5">
        <p className="font-bold text-5xl text-pink-800 mb-2">
          {Math.round(data.list[0].main.temp)}&deg;C
        </p>
        <p className="text-4xl text-gray-800 tracking-widest">
          {data.list[0].weather[0].main}
          <img src={icon} className="w-1/4 inline" alt="" />
        </p>
        <p className="text-gray-400 text-xs uppercase tracking-widest">
          {data.list[0].weather[0].description}
        </p>
        <p className="tracking-wider">{moment().format("dddd MMM YYYY")}</p>
      </div>
      <div className="my-2 border-l-2 border-gray-100">
        <p className="text-gray-400 text-lg">
          RealFeel: {Math.round(data.list[0].main.feels_like)}&deg;C
        </p>
        <p className="text-gray-400 text-lg">
          Humidity: {data.list[0].main.humidity}%
        </p>
        <p className="text-gray-400 text-lg">
          Cloud Cover: {data.list[0].clouds.all}%
        </p>
        <p className="text-gray-400 text-lg">
          Min Temp: {Math.round(data.list[0].main.temp_min)}&deg;C
        </p>
        <p className="text-gray-400 text-lg">
          Max Temp: {Math.round(data.list[0].main.temp_max)}&deg;C
        </p>
      </div>
      <Button
        onClick={onAddWeather}
        type="submit"
        className="absolute top-0 right-0 bg-amber-50 right-0"
      >
        <IoIosAddCircleOutline
          aria-hidden="true"
          type="submit"
          className="h-6 w-6"
        />
      </Button>
    </div>
  );
};
