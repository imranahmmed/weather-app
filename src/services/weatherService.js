import { DateTime } from "luxon";
const API_key = "3b656a896b724aa8f5d056127115c527"
const BASE_URL = "https://api.openweathermap.org/data/2.5"


// fetching data with url
const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_key });
    return fetch(url).then((res) => res.json())
}

// Formate current weather data
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

    const { description: condition, icon } = weather[0]

    return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, condition, icon, speed }
}

const getFormattedWeatherData = async (searchParams) => {
    // getting current weather data for format
    const formattedCurrentWeatherData = await getWeatherData("weather", searchParams).then(formatCurrentWeatherData)

    // getting forecast data for format
    const { lat, lon } = formattedCurrentWeatherData
    const formattedForecastData = await getWeatherData("forecast", { lat: lat, lon: lon, units: searchParams.units }).then(formatForecastData)

    // return current and forecast data
    return { ...formattedCurrentWeatherData, ...formattedForecastData }
}


// Formate forecast data
const formatForecastData = async (data) => {
    console.log("Original data:", data);

    let { city, list } = data
    let { timezone } = city

    // Check if daily and hourly are defined before using slice
    if (list) {
        // Formate daily forecast data
        const hourly = list.slice(1, 5).map(d => {
            return {
                title: formateLocalTime(d.dt, city.timezone, "hh:mm a"),
                temp: d.main.temp,
                max_temp: d.main.temp_max,
                min_temp: d.main.temp_min,
                icon: d.weather[0].icon,
                condition: d.weather[0].description
            }
        })

        const daily = list.filter((item) => item.dt_txt.includes("12:00:00")).map(d => {
            return {
                title: formateLocalTime(d.dt, city.timezone, "ccc"),
                temp: d.main.temp,
                max_temp: d.main.temp_max,
                min_temp: d.main.temp_min,
                icon: d.weather[0].icon,
                condition: d.weather[0].description
            }
        })


        return { timezone, hourly, daily }
    }
}

// Format to local time
const formateLocalTime = (secs, zone, format = "cccc, dd LLLL yyyy' | Local Time:' hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconUrl = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`



// const formateLocalTime = (secs, zone) => {
//     let format = "cccc, dd LLLL yyyy' | Local Time:' hh:mm a"
//     const formattedTime = DateTime.fromSeconds(secs).toFormat(format);
//     return formattedTime
// }


export default getFormattedWeatherData

export { formateLocalTime, iconUrl }