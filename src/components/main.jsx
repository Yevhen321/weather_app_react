import React, { useContext, useEffect } from "react";
import { Button } from "../common/button";
import { Input } from "../common/input";
import { Location } from "../icon/location_icon";
import { Magnifier } from "../icon/magnifier_icon";
import { Map } from "../icon/map_icon";
import { DetailCard } from "../components/detail_card";
import { WeatherContext } from "../context/weather_context";
import { MainBackground } from "./main_background";
import { ForecastForm } from "./forecast_form";
import { SavedCard } from "./saved_card";
import { Loader } from "./loader/loader";

export const Main = () => {
  const [
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
  ] = useContext(WeatherContext);

  useEffect(() => {
    const savedCityList = localStorage.getItem("cityList");
    if (!savedCityList) {
      return;
    }
    let recent = savedCityList === null ? [] : JSON.parse(savedCityList);
    setWeatherDataArray(recent);
  }, [setWeatherDataArray]);

  useEffect(() => {
    const currentCity = localStorage.getItem("foundWeatherData");
    if (!currentCity) {
      return;
    }
    let recent = currentCity === null ? [] : JSON.parse(currentCity);
    const { city, list } = recent;
    setCity(`${city.name}, ${city.country}`);
    setWeatherData(recent);
  }, [setWeatherData, setCity]);

  return (
    <MainBackground>
      <ForecastForm>
        <div className="form-container">
          <div className="flex items-center justify-center">
            <h3
              className="my-auto mr-auto text-xl text-pink-800 font-bold shadow-md py-1 px-3 
        rounded-md bg-white bg-opacity-30"
            >
              forecast
            </h3>
            <div className="flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg">
              <Map />
              <div className="text-right">
                <p className="font-semibold text-sm ml-2">{city}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-white text-2xl px-4">Your Weather Forecast</h1>
            <hr className="h-1 bg-white w-1/4 rounded-full my-5" />
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex justify-center w-full"
            >
              <Input
                type="text"
                placeholder="Enter location"
                className="relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200"
                required
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <Button type="submit" className="z-10">
                <Magnifier />
              </Button>
              <Location
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(myIP);
                }}
              />
            </form>
          </div>
        </div>

        <div className="w-2/4 p-5">
          <div className="flex flex-col my-10">
            {!weatherData ? (
              <div className="container p-4 flex items-center justify-center h-1/3 mb-auto">
                <h1 className="text-gray-300 text-4xl font-bold uppercase">
                  {loading ? <Loader /> : noData}
                </h1>
              </div>
            ) : (
              <>
                <h1 className="text-5xl text-gray-800 mt-auto mb-4">
                  Today in {city}
                </h1>
                <DetailCard
                  data={weatherData}
                  icon={weatherIcon}
                  onAddWeather={() => onAddWeather(weatherData)}
                />
              </>
            )}
            <ul className="grid grid-cols-2 gap-2 mt-4">
              {weatherDataArray.map((data, index) => {
                return (
                  <SavedCard
                    key={index}
                    data={data}
                    deleteSavedCard={() => deleteSavedCard(index)}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </ForecastForm>
    </MainBackground>
  );
};
