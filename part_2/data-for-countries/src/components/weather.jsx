import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Weather ({ country }) {
  const [currentWeather, setCurrentWeather] = useState({})
  useEffect(() => {
    let isMounted = true
    axios.get('http://api.weatherstack.com/current', {
      params: {
        access_key: process.env.REACT_APP_API_KEY,
        query: country.capital
      }
    })
      .then(res => {
        if (isMounted) setCurrentWeather(res.data.current)
      })
    // the cleanup callback will be called as soon as the component is unmounted
    return () => { isMounted = false }
  }, [])

  return (
    <>
      <h4>Weather in {country.nacapitalme}</h4>
      <div>temperature: {currentWeather.temperature}</div>
      <img src={currentWeather.weather_icons} alt='weather_icons' />
      <div>wind: {currentWeather.wind_speed} mph, direction {currentWeather.wind_dir}</div>
    </>
  )
}

export default Weather
