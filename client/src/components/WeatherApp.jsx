import {React, useState, useEffect} from 'react';
import axios from 'axios';


export default function WeatherApp() {
    const [foreCastWeather, setForeCastWeather] = useState(null)
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday']
    const dayInAWeek = new Date().getDay()

    // const forecastDays = days.slice(dayInAWeek, days.length).concat(days.slice(0, dayInAWeek))
    // console.log('first part: ', days.slice(dayInAWeek, days.length - 1))
    // console.log('second part: ',days.slice(0, dayInAWeek) )
    // console.log('forecastDays: ', forecastDays)
    const fiveDayForecast = days.slice(dayInAWeek, days.length - 1)
    console.log('fiveDayForecast: ', fiveDayForecast)
    const apiKey = import.meta.env.VITE_WEATHER_KEY
    const lat = 40.71427;
    const lon = 74.00597;
    // const weather = async () => {
    //     const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=-${lon}&exclude=hourly,minutely&units=imperial&alerts&appid=${apiKey}`)
    //     console.log("here is the weather data: ", res.data)
    //     const weekOfWeather = res.data.list
    //     const fiveDays = weekOfWeather.map((ele, i) => {
    //         return {
    //             'day': days[i],
    //             'weather': ele
    //         }
    //     })
    //     // console.log('here is the object: ', fiveDays)
    //     return res.data
    // }

    useEffect(() => {
        const getWeatherData = async() => {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=-${lon}&exclude=hourly,minutely&units=imperial&alerts&appid=${apiKey}`);
            const weekOfWeather = response.data.list
            // return weekOfWeather
            setForeCastWeather(weekOfWeather)
        } 
        // setForeCastWeather(res())
        // console.log("here is the weather data: ", res.data)
        console.log('foreCastWesther:', foreCastWeather)
        getWeatherData()
    }, [])
    // const getValue = weather()
    // setForeCastWeather(getValue)
    console.log('foreCastWesther:', foreCastWeather)


    
    return (
        <>
            <p>Five Day Forecast</p>
            {foreCastWeather && foreCastWeather.splice(0,5).map((ele, idx) => {
                return(
                <div key={idx}>
                    <img alt='weather' src={`http://openweathermap.org/img/wn/${ele.weather[0].icon}.png`}/>
                    <label>{fiveDayForecast[idx]}</label>
                    <label>{ele.weather[0].description}</label>
                    <label>{ele.main.temp}</label>
                </div>
                ) 

            })}            
        </>
    );
}