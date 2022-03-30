import React from "react";
import { Main } from "./components/main";
import { WeatherContextProvider } from "./context/weather_context";

export const App = () => {
  return (
    <WeatherContextProvider>
      <Main />
    </WeatherContextProvider>
  );
};
