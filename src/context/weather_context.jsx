import React, { useState, createContext, useEffect } from "react";
import { API_KEY } from "../reference";
import { API_URL } from "../reference";
import { APP_ICON } from "../reference";

export const WeatherContext = createContext();

export const WeatherContextProvider = (props) => {
  const [noData, setNoData] = useState("No Data Yet");
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState();

  const [weatherDataArray, setWeatherDataArray] = useState([]);
  const [city, setCity] = useState("Unknown location");
  const [weatherIcon, setWeatherIcon] = useState(`${APP_ICON}10n@2x.png`);

  const getWeather = async (location) => {
    setWeatherData();

    let howToSearch =
      typeof location === "string"
        ? `q=${location}`
        : `lat=${location[0]}&lon=${location[1]}`;

    try {
      let response = await fetch(
        `${
          API_URL + howToSearch
        }&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`
      );
      let data = await response.json();
      if (data.cod !== "200") {
        setNoData("Location not found");
        return;
      }
      if (data && data.list.length > 0) {
        setWeatherData(data.list[0]);
        setCity(`${data.city.name}, ${data.city.country}`);
        setWeatherIcon(`${APP_ICON + data.list[0].weather[0]["icon"]}@4x.png`);
        setNoData("");
      }
    } catch (error) {
      console.log("Error :" + error);
    }
  };

  const myIP = (location) => {
    const { latitude, longitude } = location.coords;
    const data = {
      latitude,
      longitude,
    };

    localStorage.setItem("data", JSON.stringify(data));

    getWeather([latitude, longitude]);
  };

  const handleChange = (input) => {
    const { value } = input.target;
    setSearchTerm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      return;
    } else {
      getWeather(searchTerm);
    }
  };

  // useEffect(() => {
  //   const currentCity = localStorage.getItem("data");
  //   let recent = currentCity === null ? [] : JSON.parse(currentCity);
  //   const { latitude, longitude } = recent;
  //   getWeather([latitude, longitude]);
  // });

  const onAddWeather = (weather) => {
    setWeatherDataArray([...weatherDataArray, weather]);
  };

  return (
    <WeatherContext.Provider
      value={[
        myIP,
        handleSubmit,
        handleChange,
        noData,
        city,
        weatherData,
        weatherIcon,
        onAddWeather,
        weatherDataArray,
      ]}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
