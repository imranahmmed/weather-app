import React from 'react'
import Div from './Div'
import Typhography from './Typhography'
import Img from './Img'
import ForecastCard from './ForecastCard'

const Forecast = ({ title }) => {
    return (
        <Div className="w-2/4 mt-6 block px-5">
            <Typhography as="p" className="text-white font-medium uppercase text-xl border-b d-block py-3">{title}</Typhography>
            <Div className="flex flex-row flex-wrap justify-around border-b">
                <ForecastCard />
                <ForecastCard />
                <ForecastCard />
                <ForecastCard />
                <ForecastCard />
            </Div>
        </Div>
    )
}

export default Forecast