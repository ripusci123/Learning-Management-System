import React from 'react'
import SignupCard from '../components/SignupCard';
import LoginCard from '../components/LoginCard';
import Container from '../components/Container';
import { Link } from 'react-router-dom';

function AuthPage() {

  return (
    <Container>
      <div className='md:flex justify-between font-[poppins] items-start'>
      <h1 className='block md:hidden text-center mb-4 font-semibold'>Choose your <span className='text-orange-600'>role</span> and start your <span className='text-orange-600'>journey</span></h1>
        <div className='w-[60%]'>
          <div className='flex justify-around'>
            <img src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='rounded-3xl h-[350px] hidden md:flex' />
            <div className='flex-col justify-center gap-3 hidden md:flex'>
              <h1 className='text-center text-4xl font-bold'>Choose your <span className='text-orange-600'>role.</span></h1>
              <h1 className='text-center text-3xl font-bold'>Start your</h1>
              <h1 className='text-center text-3xl font-bold text-orange-600'>Journey.</h1>
            </div>
          </div>
          <div className='md:flex justify-end -mt-8 hidden'>
            <img src="https://images.pexels.com/photos/3184163/pexels-photo-3184163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" srcset="" className='h-[280px] rounded-3xl' />
          </div>
        </div>
        <div className='w-full md:w-[30%] bg-[#F8F6E3]/80 rounded-3xl h-[200px] py-5 flex flex-col items-center justify-center self-center gap-5 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
          <h1 className='text-center font-semibold text-2xl'>Join as ?</h1>
          <div className='flex justify-center gap-5'>
            <button className='bg-orange-500 px-6 py-2 rounded-lg text-white hover:opacity-90'><Link to={"/instructorAuth"}>Instructor</Link></button>
            <button className='bg-orange-500 px-6 py-2 rounded-lg text-white hover:opacity-90'><Link to={"/userAuth"}>Student</Link></button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AuthPage;