import React from 'react'
import Div from './Div'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import InputBox from './InputBox'
import Button from './Button'
import Typhography from './Typhography'

const Inputs = () => {
    return (
        <Div className="flex flex-row flex-wrap justify-center my-6">
            <Div className="flex flex-row w-full md:w-2/4 items-center justify-center space-x-4 px-6">
                <Div className="relative w-full">
                    <InputBox className="text-xl font-extralight py-3 pl-5 pr-24 w-full shadow-xl focus:outline-none capitalize rounded-lg font-outfit" placeholder="Search for city..." />
                    <UilSearch size={25} className="cursor-pointer text-gray-400 transition ease-out hover:scale-125 absolute right-[50px] top-[50%] translate-y-[-50%]" />
                    <UilLocationPoint size={25} className="cursor-pointer text-gray-400 transition ease-out hover:scale-125 absolute right-[15px] top-[50%] translate-y-[-50%]" />
                </Div>
            </Div>

            <Div className="flex flex-row items-center justify-start space-x-4 mt-2 md:mt-0">
                <Div className="flex flex-row items-center justify-start space-x-1">
                    <Button name="metric" className="text-xl text-white font-medium font-outfit">°C</Button>
                    <Typhography as="p" className="text-xl text-white font-medium leading-none font-outfit">|</Typhography>
                    <Button name="imperial" className="text-xl text-white font-medium font-outfit">°F</Button>
                </Div>
            </Div>
        </Div>
    )
}

export default Inputs