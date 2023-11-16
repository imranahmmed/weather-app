import React from 'react'
import Div from './Div'
import Button from './Button'

const TopButtons = () => {
    const cities = [
        {
            id: 1,
            title: "London"
        },
        {
            id: 2,
            title: "Sydney"
        },
        {
            id: 3,
            title: "Tokyo"
        },
        {
            id: 4,
            title: "Toronto"
        },
        {
            id: 5,
            title: "Paris"
        },
    ]

    

    return (
        <Div className="flex flex-wrap items-center justify-around my-6 border-b-[1px] border-[#ffffff61] pb-9">
            {cities.map((city, index)=>(
                <Button className="text-white text-lg font-medium font-outfit uppercase tracking-[5px] w-[50%] sm:w-[25%] lg:w-[20%]  " key={index}>{city.title}</Button>
            ))}
        </Div>
    )
}

export default TopButtons