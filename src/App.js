import React from 'react';
import './App.css';
import { SearchForm } from "./searchForm/searchForm";

function App() {
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
          <SearchForm />
        </div>
      </main>
    </div>
  );
}

export default App;
