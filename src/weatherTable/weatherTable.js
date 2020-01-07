import React from "react";

import WeatherTableStyles from "../weatherTable/weatherTable.module.css";

export default (props) => {
  let content = null;
  if (props.currentForecast) {
    const {
      coord,
      weather,
      base,
      main,
      visibility,
      wind,
      clouds,
      dt,
      sys,
      timezone,
      id,
      name,
      cod,
      ...rest
    } = props.currentForecast;

    const country = sys.country;
    const temp = main.temp;
    const feelsLike = main.feels_like;
    const description = weather[0].description;
    const windSpeed = wind.speed;
    const presure = main.pressure;
    const humidity = main.humidity;
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();
    const lat = coord.lat;
    const lon = coord.lon;
    const now = new Date(Date.now());

    content =
      <div className={WeatherTableStyles.container}>
        <h2>Weather for {name}, {country}</h2>
        <div className={WeatherTableStyles.tempContainer}>
          <span className={WeatherTableStyles.tempSpan}>
            <strong>{temp}&#176; </strong> feels like <strong> {feelsLike}&#176;</strong></span>
        </div>
        <div className={WeatherTableStyles.descriptionContainer}>
          <span className={WeatherTableStyles.description}>{description}</span>
          <span className={WeatherTableStyles.currentDate}>{now.toLocaleTimeString()}, {now.toLocaleDateString()}</span>
        </div>
        <table>
          <tbody>
            <tr>
              <th className={WeatherTableStyles.odd}>Wind</th>
              <td className={WeatherTableStyles.odd}>{windSpeed} m/h</td>
            </tr>
            <tr>
              <th>Pressure</th>
              <td>{presure} hpa</td>
            </tr>
            <tr>
              <th className={WeatherTableStyles.odd}>Humid</th>
              <td className={WeatherTableStyles.odd}>{humidity} %</td>
            </tr>
            <tr>
              <th>Sunrise</th>
              <td>{sunrise}</td>
            </tr>
            <tr>
              <th className={WeatherTableStyles.odd}>Sunset</th>
              <td className={WeatherTableStyles.odd}>{sunset}</td>
            </tr>
            <tr>
              <th>Coords</th>
              <td>[{lat}, {lon}]</td>
            </tr>
          </tbody>
        </table>
      </div>
  }


  return content;
}