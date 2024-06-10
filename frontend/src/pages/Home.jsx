import React from 'react'
import peopleSVG from "../assets/people.svg"
import { motion } from "framer-motion"
import { fadeIn } from '../framer-utils/framer.js'
import CourseCard from '../components/CourseCard'
import ArrowSVG from '../assets/arrow.svg'
import BulbSVG from "../assets/bulb.svg"
import asset1 from '../assets/asset1.png'
import asset2 from '../assets/asset2.png'
import techiconsSVG from '../assets/tech-icons.svg'
import lines from '../assets/3line.svg'
import { sec3asset, plane, asset4, linesW, asset5, asset6, asset7, asset8, asset9 } from '../assets/index.js'
import FeatureCard from '../components/HomepageComponents/FeatureCard.jsx'
import { FaCheck } from "react-icons/fa6";
import AutoIncrement from '../components/HomepageComponents/AutoIncrement.jsx'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <div className='font-[poppins] tracking-tight'>

      {/* section-1 */}
      <div className="px-10 md:px-36 relative py-10 md:py-24 bg-[#f8c365] tracking-tight min-h-screen">
        <div className='flex justify-between flex-col-reverse md:flex-row'>
          <motion.div
            initial="hidden"
            whileInView={"show"}
            variants={fadeIn("right", 0.5, 0.8)}
            viewport={{ once: true }}
            className='flex flex-col gap-6 w-full md:w-1/2 mt-10 z-10 relative text-center md:text-left'>
            <h1 className='text-3xl md:text-6xl font-semibold relative leading-[0.8]'>
              Develop <span className='bg-[#ffe5ac] rounded-full px-5 text-[#f56324] italic font-[merriweather]'>Skills</span>
              <img className='absolute -top-5 -left-6 h-8' src={lines} alt="" />
            </h1>
            <h1 className='text-2xl md:text-6xl font-semibold leading-[1]'>from the best source</h1>
            <div className='text-md mt-1 text-left'>
              <p>Supercharge your skill acquisition with endless courses in your niche</p>
              <p>Explore unlimited learning opportunities </p>
              <p>tailored to your interests and goals.</p>
              <Link to="/auth">
              <button className='bg-[#f56324]  text-white px-5 py-3 text-sm mt-5 rounded-full  font-semibold'>Enroll now ↗</button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView={"show"}
            variants={fadeIn("left", 1, 0.8)}
            viewport={{ once: true }}
            className='w-full md:w-1/2 z-10 relative'>
            <img src={peopleSVG} className='md:mt-16' alt="" srcset="" />
          </motion.div>
        </div>

        <motion.img
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          src={techiconsSVG} className='absolute -top-8 right-16' alt="" srcset="" />
        <img className='absolute h-56 left-0 bottom-16' src={asset1} alt="" srcset="" />
        <img className='absolute h-56 right-0 top-20' src={asset2} alt="" srcset="" />
      </div>


      {/*section-2 */}
      <div className='flex p-10 md:p-28 justify-around md:flex-row flex-col bg-white'>
        <div className='text-center border-b-4 md:border-b-0 md:border-r-4 border-[#f6ba79] py-10 md:py-0 md:pr-32'>
          <AutoIncrement to={4.5} suffix="" subtext="80k Reviews" />
        </div>
        <div className='text-center border-b-4 md:border-b-0 md:border-r-4 border-[#f6ba79] py-10 md:py-0 md:pr-32'>
          <AutoIncrement to={6.6} suffix="K" subtext="Enrollments" />
        </div>
        <div className='text-center border-b-4 md:border-b-0 md:border-r-4 border-[#f6ba79] py-10 md:py-0 md:pr-32'>
          <AutoIncrement to={2.4} suffix="K+" subtext="Active Learners" />
        </div>
        <div className='text-center py-10 md:py-0'>
          <AutoIncrement to={10.5} suffix="K+" subtext="Popular Courses" />
        </div>
      </div>


      {/* section-3 */}
      <div className='bg-[#fef2dc] flex justify-evenly md:flex-row flex-col py-10 md:py-32 min-h-[500px] items-center relative'>
        <motion.div
          initial="hidden"
          whileInView={"show"}
          variants={fadeIn("right", 0.5, 0.8)}
          viewport={{ once: true }}
          className='relative'
        >
          <img src={asset4} className='md:h-[500px]' alt="" srcset="" />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView={"show"}
          variants={fadeIn("left", 0.5, 0.8)}
          viewport={{ once: true }}
          className='flex flex-col gap-5 text-center md:text-left'>
          <h1 className='text-3xl md:text-5xl font-medium'>We Provide</h1>
          <h1 className='text-3xl md:text-5xl font-medium'><span className='bg-[#f8c365] px-3 py-1 italic border-2 rounded-full border-black font-[merriweather] tracking-tighter'>Smart</span> Online</h1>
          <h1 className='text-3xl md:text-5xl font-medium'>Education</h1>

          <div className='text-sm md:text-base'>
            <p>Our Courses comes with assigned projects</p>
            <p>Direct interactions with mentors, relevant</p>
            <p>resources,and tools that help you dive into</p>
            <p>in-depth learning from anywhere.</p>
          </div>
          <Link to="/auth">
          <button className='bg-[#f56324]  text-white px-5 py-3 text-sm mt-5 rounded-full  font-semibold'>Enroll today ↗</button>
          </Link>
        </motion.div>
      </div>


      {/* section-4 */}
      <div className='w-full bg-white'>
        <div className='w-full p-10 md:px-52 md:py-28 flex flex-col gap-5'>

          <div className='flex gap-5 md:flex-row flex-col '>
            <motion.div
              initial="hidden"
              whileInView={"show"}
              variants={fadeIn("up", 0.2, 0.6)}
              viewport={{ once: true }}
              className='md:w-2/3 p-10 rounded-3xl bg-slate-900 relative'>
              <img className='absolute top-9 left-6' src={linesW} alt="" srcset="" />
              <h1 className='text-3xl md:text-5xl text-white font-semibold '>Our <span className='text-[#f8c365] font-[merriweather] font-semibold italic text-3xl md:text-5xl'>Features</span></h1>
              <h1 className='text-2xl md:text-5xl text-white font-semibold leading-relaxed'>Special for you</h1>
              <Link to="/auth">
              <button className='bg-[#f8c365] px-8 py-3 text-sm mt-8 rounded-full  font-semibold'>Enroll today ↗</button>
              </Link>
            </motion.div>
            <FeatureCard heading={"Get Certified"} description={"Add value to your certificate and increase the chance of getting hired in your dream company"} image={asset5} delay={0.4} />
          </div>

          <div className='flex gap-5 md:flex-row flex-col'>
            <FeatureCard heading={"Amazing Instructor"} description={"Our Amazing instructors bring experience,knowledge and fun in the course."} image={asset6} delay={0.6} />
            <FeatureCard heading={"Lifetime Support"} description={"You will have life time access of the course and resources which helps you to learn and revise anytime anywhere."} image={asset7} delay={0.8} />
            <FeatureCard heading={"Video Lesson"} description={"Recorded Version of Lectures From professional Instructors to boost your growth."} image={asset8} delay={1} />
          </div>
        </div>
      </div>


      {/* section5 */}
      <div className='p-10 md:px-24 md:py-20 flex flex-col gap-10 md:gap-20 bg-gray-800'>
        <div className='text-center'>
          <h1 className='text-4xl inline-block text-white'>Popular <span className='inline-block md:mt-0 mt-2 text-[#f8c365] px-3 rounded-full border border-[#f8c365] bg-transparent italic font-[merriweather]'>Courses</span></h1>
        </div>

        <div className='flex justify-around gap-10 md:flex-row flex-col'>
          <CourseCard title="Python Mastery" btnText={"Go to Course"} price={1200} description={"Learn UI/UX"} src={"https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} delay={0.4} />
          <CourseCard title="UI/UX Beginner" btnText={"Go to Course"} price={1400} description={"Learn React"} src={"https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"} delay={0.6} />
          <CourseCard title="Nodejs A to Z" btnText={"Go to Course"} price={1700} description={"Learn Node"} src={"https://images.pexels.com/photos/1261427/pexels-photo-1261427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} delay={0.8} />
        </div>

        <img src={ArrowSVG} className='absolute right-5 md:right-14 h-14 md:h-20' alt="" srcset="" />
        <img src={BulbSVG} className='absolute left-5 md:left-14 h-14 md:h-20' alt="" srcset="" />
      </div>

      {/* section6 */}
      <div className='flex justify-evenly flex-col-reverse md:flex-row p-8 md:py-32 min-h-[500px] items-center relative bg-white'>
        <motion.div
          initial="hidden"
          whileInView={"show"}
          variants={fadeIn("left", 0.5, 0.8)}
          viewport={{ once: true }}
          className='flex flex-col gap-5'>
          <h1 className='text-3xl md:text-5xl font-medium'>Its easy to start</h1>
          <div>
            <p className='bg-[#fdc365] px-4 py-3 border-2 border-black rounded-full text-2xl md:text-5xl font-[merriweather] italic inline-block'>Learning</p>
          </div>
          <div className=' md:text-base text-sm'>
            <p>Our sign-in process lets you start your learning</p>
            <p>journey without much hassle.Our aim is to</p>
            <p>create a great learning experience for you.</p>
          </div>

          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'><span className='w-fit bg-[#f8c365] rounded-full p-1'><FaCheck /></span><p>Create Account</p></div>
            <div className='flex items-center gap-2'><span className='w-fit bg-[#f8c365] rounded-full p-1'><FaCheck /></span><p>Enroll in Course</p></div>
            <div className='flex items-center gap-2'><span className='w-fit bg-[#f8c365] rounded-full p-1'><FaCheck /></span><p>Start Learning</p></div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView={"show"}
          variants={fadeIn("right", 0.5, 0.8)}
          viewport={{ once: true }}
          className='relative'
        >
          <img src={asset9} className='max-h-[400px]' alt="" srcset="" />
        </motion.div>

      </div>  
    </div>
  )
}

export default Home