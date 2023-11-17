import axios from "axios";
import { DateTime } from "luxon";

const API_key = "3b656a896b724aa8f5d056127115c527";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Modify the getWeatherData function to get the 5-day forecast
const getWeatherData = async (infoType, searchParams) => {
    let url;

    if (infoType === "weather") {
        // Current weather endpoint
        url = new URL(`${BASE_URL}/weather`);
    } else if (infoType === "forecast") {
        // 5-day forecast endpoint
        url = new URL(`${BASE_URL}/forecast`);
    } else {
        // Default to oneCall for other cases
        url = new URL(`${BASE_URL}/oneCall`);
    }

    url.search = new URLSearchParams({ ...searchParams, appid: API_key });

    return fetch(url).then((res) => res.json());
};

// Formate forecast data
const formatForecastData = async (data) => {
    let { city, list } = data;
    let { timezone } = city;

    // Formate daily forecast data
    const dailyForecast = list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .map((d) => ({
            title: formateLocalTime(d.dt, timezone, "cccc"),
            temp: d.main.temp,
            max_temp: d.main.temp_max,
            min_temp: d.main.temp_min,
            icon: d.weather[0].icon,
        }));

    return { timezone, daily: dailyForecast };
};

const getFormattedWeatherData = async (searchParams) => {
    // getting forecast data for format
    const forecastData = await getWeatherData("forecast", searchParams);
    const formattedForecastData = await formatForecastData(forecastData);

    return formattedForecastData;
};

// Format to local time
const formateLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local Time:' hh:mm a") =>
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

// Usage to get 5-day forecast
const searchParams = {
    q: "dhaka", // Replace with the actual name of the city
    units: "imperial", // or "imperial" for Fahrenheit
};
const weatherData = await getFormattedWeatherData(searchParams);
console.log(weatherData);
export default getFormattedWeatherData
