import {React, useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/WeatherApp.css'; 


export default function WeatherApp() {
    const [foreCastWeather, setForeCastWeather] = useState(null)
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday']
    const dayInAWeek = new Date().getDay()

    const firstIndex = (dayInAWeek + 6) % 7;
    const fiveDayForecast = 5;
    const lastIndex = (firstIndex + fiveDayForecast) % 7;

    let forecastSchedule;

    if(firstIndex < lastIndex){
        forecastSchedule = days.slice(firstIndex, lastIndex)
    }else {
        forecastSchedule = days.slice(firstIndex).concat(days.slice(0,fiveDayForecast))
    }

    // const fiveDayForecast = days.slice(dayInAWeek - 1, days.length - 1)
    const apiKey = import.meta.env.VITE_WEATHER_KEY
    const lat = 40.71427;
    const lon = 74.00597;


    useEffect(() => {
        const getWeatherData = async() => {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=-${lon}&exclude=hourly,minutely&units=imperial&alerts&appid=${apiKey}`);
            const weekOfWeather = response.data.list
            setForeCastWeather(weekOfWeather)
        } 
        getWeatherData()
    }, [])
   
    return (
        <div >
            <h1>Five-Day Forecast</h1>
            <div className='weather'>
                {foreCastWeather && foreCastWeather.splice(0,5).map((ele, idx) => {
                    return(
                    <div key={idx} className='weather__card'>
                        <p className='weather__day'>{forecastSchedule[idx]}</p>
                        <div className='weather__image--container'>
                            <img className='weather__image' alt='weather' src={`http://openweathermap.org/img/wn/${ele.weather[0].icon}.png`}/>
                        </div>
                        <p className='weather__temperature'>{ele.main.temp}°F</p>
                        <p className='weather__description'>{ele.weather[0].description}</p>
                        
                    </div>
                    ) 

                })}
            </div>            
        </div>
    );
}