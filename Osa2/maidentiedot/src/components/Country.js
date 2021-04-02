import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    const hook = () => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
        .then(response => {
            setWeather(response.data.current)
        })
    }
    useEffect(hook, [])

    return (
        <div>
            <h1> {country.name} </h1> 
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h2> Languages </h2>
            <ul>
            {country.languages.map(language => <li> {language.name}</li>)} 
            </ul>
            <img src={country.flag} width="200px" ></img>
            <h2> Weather in {country.capital}</h2>
            <p> <b>temperature: </b>{weather.temperature} Celcius </p>
            <img src={weather.weather_icons}></img>
            <p> <b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</p>
      </div>
    )
}
export default Country