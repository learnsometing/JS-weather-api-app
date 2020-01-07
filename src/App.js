import React, { useState } from 'react';
import './App.css';
import SearchForm from "./searchForm/searchForm";
import WeatherTable from "./weatherTable/weatherTable";

function App() {
  const [currentForecast, setCurrentForecast] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          Weather
        </div>
      </header>
      <main>
        <div className="main-container">
          <h1>Weather Forecast</h1>
          <SearchForm setCF={setCurrentForecast} />
          <WeatherTable currentForecast={currentForecast} />
        </div>
      </main>
    </div>
  );
}

export default App;
