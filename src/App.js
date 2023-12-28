import React, { useState } from "react";
import axios from "axios";

import "./index.css";

export default function App() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState(null);

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSearch(event) {
    event.preventDefault();
    let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSearch}>
      <input type="search" placeholder="Type a city" onChange={updateCity} />
      <button type="submit" value="Search">
        Search
      </button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C </li>
          <li>Description: {weather.description} </li>
          <li>Humidity: {weather.humidity}% </li>
          <li>Wind: {weather.wind}km/h </li>
          <li>
            <img src={weather.icon} alt={weather.description} />{" "}
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
