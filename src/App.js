import React, { useState } from 'react';
import './App.css';
import SearchForm from "./searchForm/searchForm";

function App() {
  const [currentForecast, setCurrentForecast] = useState(null);
  console.log(currentForecast);
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
          <div id="current-forecast">
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
