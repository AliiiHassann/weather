import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search from "../assets/search.png";
import cloud from "../assets/cloud.png";
import clear from "../assets/clear.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import humidityimg from "../assets/humidity.png";
import wind from "../assets/wind.png";
export const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };
  const searchBar = async (city) => {
    const apiKey = "5418ed2a5ee6f028c1807a7026d8b3f9";
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
    }
  };
  useEffect(() => {
    searchBar("London");
  }, []);
  return (
    <div className='container'>
      <div className='box'>
        <div className='search'>
          <input
            ref={inputRef}
            placeholder='Search Here'
            type='text'
            required
          />
          <img
            src={search}
            alt=''
            onClick={() => searchBar(inputRef.current.value)}
          />
        </div>
        {weatherData ? (
          <>
            <img src={weatherData.icon} alt='' className='weather-pic' />
            <p className='temperature'>{weatherData.temperature}℃</p>
            <p className='location'>{weatherData.location}</p>
            <div className='weather-box'>
              <div className='col'>
                <img src={humidityimg} alt='' />
                <div className='humidity-text'>
                  <p>{weatherData.humidity} %</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className='col'>
                <img src={wind} alt='' />
                <div className='wind-text'>
                  <p>{weatherData.windSpeed} Km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
