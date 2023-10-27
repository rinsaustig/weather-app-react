import { useState } from "react"

export const WeatherApp = () => {

    const baseUrl = 'http://api.openweathermap.org/geo/1.0/direct'
    const apikey = '104d2c62b2e9155dcda07a081026945d'
    const secondBaseUrl = 'https://api.openweathermap.org/data/2.5/weather'
    const difKelvin = 273.15

    const [city, setCity] = useState('')

    const [weatherData, setWeatherData] = useState(null)

    
    const handleChangeCity = (e) => {
        e.preventDefault()
        setCity(e.target.value)
    }
   
    const handleSubmit = (e) => {
        e.preventDefault()
        if(city.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${baseUrl}?q=${city}&appid=${apikey}`)
            const data = await response.json()
            const lat = data[0].lat
            const lon = data[0].lon
            const responseWeather = await fetch(`${secondBaseUrl}?lat=${lat}&lon=${lon}&appid=${apikey}`)
            const dataWeather = await responseWeather.json()
            setWeatherData(dataWeather)
        } catch (error) {
            console.error('It ocurred the following isue:', error)
        }
    }

    return (
    <div className="container">
        <h1>Weather App</h1>

        <form onSubmit={handleSubmit}>
            <input type="text"
            value={city}
            onChange={handleChangeCity} />
            <button type="submit">Search</button>
        </form>
        {
            weatherData && (
                <div>
                    <h2>
                    {weatherData.name}
                    </h2>
                    <p>
                        Temperature: {parseInt(weatherData?.main?.temp - difKelvin)}°C
                    </p>
                    <p>
                        Weather condition: {weatherData.weather[0].description}
                    </p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                </div>
            )
        }

    </div>
  )
}
