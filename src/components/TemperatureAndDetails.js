import React from 'react'
import Div from './Div'
import Typhography from './Typhography'
import Img from './Img'
import { UilTemperature, UilArrowDown, UilArrowUp, UilTear, UilWind, UilSun, UilSunset } from '@iconscout/react-unicons'
const TemperatureAndDetails = () => {
    return (
        <>
            <Div className="flex flex-row items-center text-white text-center justify-center py-3 gap-5">
                <Div>
                    <Img src="images/cloudy.png" className="w-20 mx-auto mb-3" />
                    <Typhography as="p" className="text-5xl font-medium block font-outfit text-center mb-3">34°</Typhography>
                    <Typhography as="p" className="text-xl text-cyan-300 text-center">Cloudy or whatever</Typhography>
                </Div>
            </Div>

            <Div className="flex flex-row gap-x-10 gap-y-3 text-white font-light text-md  flex-wrap items-center justify-center">
                <Div className="flex text-white font-light text-lg items-center">
                    <UilTemperature /> Real Feel : <b>32°</b>
                </Div>
                <Div className="flex text-white font-light text-lg items-center">
                    <UilTear /> Humidity : <b>45%</b>
                </Div>
                <Div className="flex text-white font-light text-lg items-center">
                    <UilWind /> Wind : <b>3 km/h</b>
                </Div>
                <Div className="flex text-white font-light text-lg items-center">
                    <UilSun /> Rise : <b>6:35 AM</b>
                </Div>
                <Div className="flex text-white font-light text-lg items-center">
                    <UilSunset /> Sunset : <b>5:30 PM</b>
                </Div>
                <Div className="flex text-white font-light text-lg items-center">
                    <UilArrowUp /> High : <b>32°</b>
                </Div>
                <Div className="flex text-white font-light text-lg items-center">
                    <UilArrowDown /> Low : <b>28°</b>
                </Div>



            </Div>
        </>
    )
}

export default TemperatureAndDetails