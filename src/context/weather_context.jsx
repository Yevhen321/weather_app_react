import React, { useState, createContext } from "react";

export const WeatherContext = createContext();

export const WeatherContextProvider = (props) => {
  const [noData, setNoData] = useState("No Data Yet");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

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
        setLoading(false);
        setWeatherData({ city: data.city, list: data.list });
        localStorage.setItem(
          "foundWeatherData",
          JSON.stringify({ city: data.city, list: data.list })
        );
        setCity(`${data.city.name}, ${data.city.country}`);
        setWeatherIcon(
          `${
            process.env.REACT_APP_ICON + data.list[0].weather[0]["icon"]
          }@4x.png`
        );
        setNoData("");
      }
    } catch (error) {
      setLoading(false);
      console.log("Error :" + error);
    }
  };

  const myIP = (location) => {
    const { latitude, longitude } = location.coords;
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
    const isCityExist = weatherDataArray.find(
      (w) => w.city.name === weather.city.name
    );

    if (isCityExist) {
      return;
    }
    setWeatherDataArray([weather, ...weatherDataArray]);
    const fullData = [weather, ...weatherDataArray];
    const cityData = fullData.map((list) => list);
    localStorage.setItem("cityList", JSON.stringify(cityData));
  };

  const deleteSavedCard = (ind) => {
    const localStorageCityList = localStorage.getItem("cityList");
    if (localStorageCityList) {
      const parsedLocalStorageCityList = JSON.parse(localStorageCityList);
      const updatedLocalStorageList = parsedLocalStorageCityList.filter(
        (data, index) => index !== ind
      );
      localStorage.setItem("cityList", JSON.stringify(updatedLocalStorageList));
      setWeatherDataArray(updatedLocalStorageList);
    }
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
        searchTerm,
        loading,
        setWeatherDataArray,
        setWeatherData,
        setCity,
      ]}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
