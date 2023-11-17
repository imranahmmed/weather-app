import React from 'react'
import Div from './Div'
import Typhography from './Typhography'
import Img from './Img'
import { UilTemperature, UilArrowDown, UilArrowUp, UilTear, UilWind, UilSun, UilSunset } from '@iconscout/react-unicons'
import { formateLocalTime, iconUrl } from '../services/weatherService'
const TemperatureAndDetails = ({ weather: { condition, feels_like, humidity, icon, speed, sunrise, sunset, temp, temp_max, temp_min, timezone } }) => {
    return (
        <>
            <Div className="flex flex-row items-center text-white text-center justify-center py-3 gap-5">
                <Div>
                    <Img src={iconUrl(icon)} className="mx-auto w-30 mb-3" />
                    <Typhography as="p" className="text-7xl font-medium block font-outfit text-center mb-3">{temp.toFixed()}°</Typhography>
                    <Typhography as="p" className="text-xl text-cyan-300 text-center capitalize">{condition}</Typhography>
                </Div>
            </Div>

            <Div className="flex flex-row gap-x-10 gap-y-3 text-white font-light text-md py-3 flex-wrap items-center justify-center">
                <Div className="flex text-white font-light text-xl items-center">
                    <UilTemperature /> Real Feel : <b className='ml-1'>{feels_like.toFixed()}°</b>
                </Div>
                <Div className="flex text-white font-light text-xl items-center">
                    <UilTear /> Humidity : <b className='ml-1'>{humidity.toFixed()}%</b>
                </Div>
                <Div className="flex text-white font-light text-xl items-center">
                    <UilWind /> Wind : <b className='ml-1'>{speed.toFixed()} km/h</b>
                </Div>
                <Div className="flex text-white font-light text-xl items-center">
                    <UilSun /> Rise : <b className='ml-1'>{formateLocalTime(sunrise, timezone, "hh:mm a")}</b>
                </Div>
                <Div className="flex text-white font-light text-xl items-center">
                    <UilSunset /> Sunset : <b className='ml-1'>{formateLocalTime(sunset, timezone, "hh:mm a")}</b>
                </Div>
                <Div className="flex text-white font-light text-xl items-center">
                    <UilArrowUp /> High : <b className='ml-1'>{temp_max.toFixed()}°</b>
                </Div>
                <Div className="flex text-white font-light text-xl items-center">
                    <UilArrowDown /> Low : <b className='ml-1'>{temp_min.toFixed()}°</b>
                </Div>



            </Div>
        </>
    )
}

export default TemperatureAndDetails