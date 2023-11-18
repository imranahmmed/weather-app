import { DateTime } from "luxon";
const API_key = "3b656a896b724aa8f5d056127115c527";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// fetching data with url
const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(`${BASE_URL}/${infoType}`);
    url.search = new URLSearchParams({ ...searchParams, appid: API_key });

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        return error.message
    }
};

// Formate current weather data
const formatCurrentWeatherData = async (data) => {
    try {
        const {
            coord: { lat, lon },
            main: { temp, feels_like, temp_min, temp_max, humidity },
            name,
            dt,
            sys: { country, sunrise, sunset },
            weather,
            wind: { speed },
        } = data;

        const { description: condition, icon } = weather[0];

        return {
            lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, condition, icon, speed,
        };
    } catch (error) {
        console.log(error.message)
        console.error("Error formatting current weather data:", error.message);
    }
};

// Format function
const getFormattedWeatherData = async (searchParams) => {
    try {
        // getting current weather data for format
        const formattedCurrentWeatherData = await getWeatherData(
            "weather",
            searchParams
        ).then(formatCurrentWeatherData);

        // getting forecast data for format
        if (formattedCurrentWeatherData !== null) {
            const { lat, lon } = formattedCurrentWeatherData;
            const formattedForecastData = await getWeatherData("forecast", {
                lat: lat ? lat : "",
                lon: lon ? lon : "",
                units: searchParams.units,
            }).then(formatForecastData);
            return { ...formattedCurrentWeatherData, ...formattedForecastData };
        }
        // return current and forecast data
    } catch (error) {
        console.error("Error getting formatted weather data:", error.message);
    }
};

// Formate forecast data
const formatForecastData = async (data) => {
    try {
        let { city, list } = data;
        let { timezone } = city;

        // Check if daily and hourly are defined before using slice
        if (list) {
            // Formate daily forecast data
            const hourly = list.slice(1, 6).map((d) => {
                return {
                    title: formateLocalTime(d.dt, city.timezone, "hh:mm a"),
                    temp: d.main.temp,
                    max_temp: d.main.temp_max,
                    min_temp: d.main.temp_min,
                    icon: d.weather[0].icon,
                    condition: d.weather[0].description,
                };
            });

            const daily = list
                .filter((item) => item.dt_txt.includes("12:00:00"))
                .map((d) => {
                    return {
                        title: formateLocalTime(d.dt, city.timezone, "ccc"),
                        temp: d.main.temp,
                        max_temp: d.main.temp_max,
                        min_temp: d.main.temp_min,
                        icon: d.weather[0].icon,
                        condition: d.weather[0].description,
                    };
                });

            return { timezone, hourly, daily };
        }
    } catch (error) {
        console.error("Error formatting forecast data:", error.message);
        throw error;
    }
};

// Format to local time
const formateLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLLL yyyy' | Local Time:' hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

// Dynamic Icon URL
const iconUrl = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formateLocalTime, iconUrl };
