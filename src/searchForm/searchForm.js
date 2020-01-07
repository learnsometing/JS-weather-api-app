import React, { useState } from "react";
// import ReactDOM from "react-dom";

import SearchFormStyles from "./searchForm.module.css"

export const UnitButtons = ({ onClick, activeBtn }) => {
  let metricStyle = SearchFormStyles.inactiveBtn;
  let imperialStyle = SearchFormStyles.activeBtn;

  if (activeBtn === 'metric') {
    metricStyle = SearchFormStyles.activeBtn;
    imperialStyle = SearchFormStyles.inactiveBtn;
  }

  return (
    <div className={SearchFormStyles.unitBtns}>
      <button
        type="button"
        onClick={onClick.bind(null, 'metric')}
        className={metricStyle}
      >
        &#176;C
     </button>
      <button
        type="button"
        onClick={onClick.bind(null, 'imperial')}
        className={imperialStyle}
      >
        &#176;F
      </button>
    </div>
  );
};

export const createRequest = (city, selectedUnit, options = {}) => {
  const API_KEY = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;

  return new Request(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${selectedUnit}&appid=${API_KEY}`,
    options
  );
}

export const PureSearchForm = (props) => {
  const [city, setCity] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('imperial');

  const handleChange = (event) => {
    setCity(event.target.value);
  }

  const handleSubmit = (event) => {
    const options = {
      method: 'GET',
      mode: 'cors'
    };

    const request = props.createRequest(city, selectedUnit, options);

    fetch(request)
      .then(response => {
        if (!response.ok) {
          throw new Error('Nothing to geocode');
        }

        return response.json();
      })
      .then(
        function fullfilled(json) { props.setCF(json) },
        function rejected(err) { console.log(err) }
      );
    event.preventDefault();
  }

  return (
    <div className={SearchFormStyles.formContainer}>
      <form onSubmit={handleSubmit} className={SearchFormStyles.form}>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Your City Name"
          className={SearchFormStyles.textInput} />
        <div className={SearchFormStyles.buttonGroup}>
          <UnitButtons onClick={setSelectedUnit} activeBtn={selectedUnit} />
          <input
            type="submit"
            value="Search"
            className={SearchFormStyles.btnInput}
          />
        </div>

      </form>
    </div>
  );
}

export default (props) => (
  <PureSearchForm createRequest={createRequest} setCF={props.setCF} />
);