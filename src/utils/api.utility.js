export const fetchWeather = async (location) => {
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
    return await response.json();
  } catch (error) {
    console.log("Error :" + error);
  }
};
