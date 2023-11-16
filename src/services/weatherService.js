import axios from "axios";

const API_key = "3b656a896b724aa8f5d056127115c527"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_key });
    return fetch(url).then((res) => res.json())
}

const formatCurrentWeatherData = async (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data

    const { main: condition, icon } = weather[0]

    return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, condition, icon, speed }
}


const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeatherData = await getWeatherData("weather", searchParams).then(formatCurrentWeatherData)

    return formattedCurrentWeatherData
}

export default getFormattedWeatherData