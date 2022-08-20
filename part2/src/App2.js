import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const Filter = ({ handleCountryChange }) => {
    return (
        <form>
            find countries <input onChange={handleCountryChange} />
        </form>
    )
} 

const CountryList = ({ countries, countryChanger }) => {
    if (countries.length <= 10) {
        return (
            <ul>
                {countries.map((c, index) => 
                    <li key={Math.random() * 1000}>
                        {c.name.common}
                        <button onClick={() => countryChanger(index)}>
                            view
                        </button>
                    </li>
                )}
            </ul>
        )
    } else {
        return (
            <>
                Too many matches, specify another filter
            </>
        )
    }
}

const Weather = ({ city }) => {
    const [weather, setWeather] = useState({})
    const api_key = process.env.REACT_APP_ENV_KEY
    const request = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    useEffect(() => {
        axios.get(request).then(response => 
            setWeather(response.data)
        )
        console.log(weather)
    }, [city])

    const intoCelsius = (degrees) => {
        return (degrees - 273.15).toFixed(2)
    }
    if (Object.keys(weather).length !== 0) {
        return (
            <>
                {console.log(weather)}
                <h2>Weather in {city}</h2>
                temprature {intoCelsius(weather.main.temp)}<br/>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="bruh" /><br/>
                wind {weather.wind.speed} m/s
                
            </>  
        )
    } else {
        return <></>
    }
    
}

const CountryData = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            
            capital {country.capital}<br/>
            area {country.area}<br/>

            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map((v, index) => 
                    <li key={index}>
                        {v}
                    </li>
                )}
            </ul>

            <img src={country.flags.png} alt="bruh"/> 

            <Weather city={country.capital} />
        </div>
    )
}

const App2 = () => {
    const [country, setCountry] = useState('')
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])

    const handleCountryChange = (event) => {
        setCountry(event.target.value)
    }

    useEffect(() => {
        setFilteredCountries(countries.filter(c => 
                c.name.common.toLowerCase().search(country) !== -1
            )
        )
    }, [country])
    
    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all').then(response => {
            setCountries(response.data)
        })
    }, [])
    
    const countryChanger = (index) => {
        setFilteredCountries([filteredCountries[index]])
    }

    if (filteredCountries.length === 1) {
        return (
            <>
                <Filter handleCountryChange={handleCountryChange} />
                <CountryData country={filteredCountries[0]} />
            </>
        )
    } else {
        return (
            <>
                <Filter handleCountryChange={handleCountryChange} />
                <CountryList countries={filteredCountries} countryChanger={countryChanger} />
            </>
        )
    }

}

export default App2