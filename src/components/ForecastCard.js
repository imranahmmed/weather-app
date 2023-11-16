import React from 'react'
import Div from './Div'
import Typhography from './Typhography'
import Img from './Img'

const ForecastCard = () => {
    return (
        <Div className="flex flex-col items-center justify-center w-[50%] sm:w-[25%] md:w-[20%] lg:w-[20%] border-r-[1px] border-[#ffffff61] last:border-0 my-3">
            <Typhography as="p" className="text-white font-medium uppercase text-lg border-b-[1px] border-[#ffffff61] d-block py-3">03:30PM</Typhography>
            <Img src="../images/sun.png" className="w-12 my-3" alt="" />
            <Typhography as="p" className="text-white font-medium uppercase text-lg border-t-[1px] border-[#ffffff61] d-block py-3">35°</Typhography>
        </Div>
    )
}

export default ForecastCard