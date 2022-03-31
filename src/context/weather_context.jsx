import React, { useState, createContext } from "react";

export const WeatherContext = createContext();

export const WeatherContextProvider = (props) => {
  const [noData, setNoData] = useState("No Data Yet");
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [weatherDataArray, setWeatherDataArray] = useState([]);
  const [city, setCity] = useState("Unknown location");
  const [weatherIcon, setWeatherIcon] = useState(
    `${process.env.REACT_APP_ICON}10n@2x.png`
  );

  const getWeather = async (location) => {
    let howToSearch =
      typeof location === "string"
        ? `q=${location}`
        : `lat=${location[0]}&lon=${location[1]}`;

    try {
      let response = await fetch(
        `${process.env.REACT_APP_URL + howToSearch}&appid=${
          process.env.REACT_APP_KEY
        }&units=metric&cnt=5&exclude=hourly,minutely`
      );
      let data = await response.json();
      if (data.cod !== "200") {
        setNoData("Location not found");
        return;
      }
      if (data && data.list.length > 0) {
        setWeatherData(data);
        setCity(`${data.city.name}, ${data.city.country}`);
        setWeatherIcon(
          `${
            process.env.REACT_APP_ICON + data.list[0].weather[0]["icon"]
          }@4x.png`
        );
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      return;
    }
    getWeather(searchTerm);
    setSearchTerm("");
  };

  const onAddWeather = (weather) => {
    setWeatherDataArray([weather, ...weatherDataArray]);
  };

  const deleteSavedCard = (ind) => {
    const updatedList = weatherDataArray.filter((data, index) => index !== ind);
    setWeatherDataArray(updatedList);
  };

  return (
    <WeatherContext.Provider
      value={[
        myIP,
        handleSubmit,
        setSearchTerm,
        noData,
        city,
        weatherData,
        weatherIcon,
        onAddWeather,
        weatherDataArray,
        deleteSavedCard,
        getWeather,
        searchTerm,
      ]}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
