import React from "react";

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
      <div>
        <h2>Weather for {name}, {country}</h2>
        <div>
          <span>{temp}&#176;</span>
          <span>feels like</span>
          <span>{feelsLike}</span>
        </div>
        <div>
          <span>{description}</span>
          <span>{now.toLocaleTimeString()}, {now.toLocaleDateString()}</span>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Wind</th>
              <td>{windSpeed} m/h</td>
            </tr>
            <tr>
              <th>Pressure</th>
              <td>{presure} hpa</td>
            </tr>
            <tr>
              <th>Humid</th>
              <td>{humidity} %</td>
            </tr>
            <tr>
              <th>Sunrise</th>
              <td>{sunrise}</td>
            </tr>
            <tr>
              <th>Sunset</th>
              <td>{sunset}</td>
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