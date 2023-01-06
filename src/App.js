import React, { useState } from 'react'
import Button from '@mui/material/Button'

const api = {
  key: 'e2b12be2b37e07a456a775693bc6f030',
  base: 'https://api.openweathermap.org/data/2.5/'
}
function App () {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  function search () {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('')
        console.log(result)
      })
  }
  const dateBuilder = d => {
    let months = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december'
    ]
    let days = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday'
    ]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 16
            ? 'app warm'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Enter City Name...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            autoFocus
          />
          <Button
            variant='contained'
            className='search-button'
            style={{
              backgroundColor: '#ffffff80',
              color: '#313131'
            }}
            onClick={search}
          >
            Get Update
          </Button>
        </div>
        {typeof weather.main != 'undefined' ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name},{weather.sys.country}
              </div>
              <div className='date'>{dateBuilder(new Date())}</div>
              <div className='weather-box-container'>
                <div className='weather-box'>
                  <div className='weather-data-container'>
                    <div className='temp'>
                      {Math.round(weather.main.temp)}°c
                    </div>
                    <div className='weather-desc'>
                      <p className='weather'>{weather.weather[0].main}</p>
                    </div>
                  </div>
                  <div className='weather-icon-container'>
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                      alt='weather-icon'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  )
}

export default App
