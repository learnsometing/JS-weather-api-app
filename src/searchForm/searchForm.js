import React, { useState } from "react";

import getCurrentForecast from "../util/getCurrentForecast";
import request from "../util/request";

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

export const PureSearchForm = (props) => {
  const [city, setCity] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('imperial');

  const handleChange = (event) => {
    setCity(event.target.value);
  }

  const handleSubmit = (event) => {
    const req = request(city, selectedUnit);
    getCurrentForecast(req).then(
      json => props.setCF(json),
      err => console.error(err)
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
  <PureSearchForm setCF={props.setCF} />
);