import React from 'react'
import Div from './Div'
import Typhography from './Typhography'
import Img from './Img'
import { iconUrl } from '../services/weatherService'
import { UilArrowDown, UilArrowUp } from '@iconscout/react-unicons'

const Forecast = ({ title, items }) => {
    // console.log(items)
    return (
        <Div className="w-full md:w-2/4 mt-6 block px-5">
            <Typhography as="p" className="text-white font-medium uppercase text-xl d-block py-3">{title}</Typhography>
            <Div className="flex flex-row flex-wrap justify-around">
                {items.map((item, index) => (
                    <Div key={index} className="flex flex-col items-center justify-center w-[100%] sm:w-[50%] md:w-[50%] lg:w-[33.3%] xl:w-[20%] border-[1px] border-[#ffffff61] my-3">
                        <Typhography as="p" className="text-white font-medium uppercase text-lg border-b-[1px] border-[#ffffff61] d-block py-3">{item.title}</Typhography>
                        <Img src={iconUrl(item.icon)} className="w-12 my-3" alt="" />
                        <Typhography as="p" className="text-white font-light text-sm border-t-[1px] border-[#ffffff61] d-block py-3 capitalize">{item.condition}</Typhography>

                        <Typhography as="p" className="text-white font-medium uppercase text-2xl border-t-[1px] border-[#ffffff61] d-block py-3">{item.temp.toFixed()}°</Typhography>

                        <Div className="flex flex-row justify-around items-center">
                            <Typhography as="p" className="text-white font-light uppercase text-lg border-t-[1px] border-[#ffffff61] flex flex-row items-center py-3"> <b className='ml-1'>{item.max_temp.toFixed()}°</b> <UilArrowUp /> </Typhography>
                            <Typhography as="p" className="text-white font-medium uppercase text-lg border-t-[1px] border-[#ffffff61] flex flex-row items-center py-3"><UilArrowDown /><b className='ml-1'>{item.min_temp.toFixed()}°</b></Typhography>
                        </Div>
                    </Div>
                ))}
            </Div>
        </Div>
    )
}

export default Forecast