import React from 'react'
import Div from './Div'
import Typhography from './Typhography'

const TimeAndLocation = () => {
    return (
        <Div className="flex items-center justify-center flex-col my-6 space-y-4">
            <Typhography as="p" className="text-white text-xl font-extralight font-outfit text-center">Thursday, 16 November 2023 | Local Time: 3:25 AM</Typhography>
            <Typhography as="p" className="text-white text-3xl font-medium block font-outfit text-center">Dhaka, Bangladesh</Typhography>
        </Div>
    )
}

export default TimeAndLocation