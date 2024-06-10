import React from 'react'
import  asset5  from '../../assets/asset5.png'
import { motion } from "framer-motion"
import { fadeIn } from '../../framer-utils/framer.js'


function FeatureCard({heading,description,image,delay}) {
    return (
        <motion.div
            initial="hidden"
            whileInView={"show"}
            variants={fadeIn("up",delay,0.6)}
            viewport={{once:true}}
            className='flex-1 flex flex-col gap-5 px-6 py-4 rounded-3xl bg-[#f8c365]'>
            <div>
                <img src={image} className='h-24' alt="" srcset="" />
            </div>
            <h1 className='font-semibold text-xl'>{heading}</h1>
            <p className='text-md'>{description}</p>
        </motion.div>
    )
}

export default FeatureCard