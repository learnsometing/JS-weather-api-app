export default (city, selectedUnit) => {
  const API_KEY = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;
  return {
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${selectedUnit}&appid=${API_KEY}`
  };
}