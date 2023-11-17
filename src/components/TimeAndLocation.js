import React from 'react'
import Div from './Div'
import Typhography from './Typhography'
import { formateLocalTime } from '../services/weatherService'

const TimeAndLocation = ({weather}) => {
    const {dt, name, country} = weather
    return (
        <Div className="flex items-center justify-center flex-col my-6 space-y-4">
            <Typhography as="p" className="text-white text-xl font-extralight font-outfit text-center">{formateLocalTime(dt)}</Typhography>
            <Typhography as="p" className="text-white text-3xl font-medium block font-outfit text-center">{name} , {country}</Typhography>
        </Div>
    )
}

export default TimeAndLocation