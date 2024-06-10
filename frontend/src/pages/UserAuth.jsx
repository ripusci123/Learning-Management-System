import React, { useState } from 'react'
import Container from '../components/Container'
import LoginCard from '../components/LoginCard';
import SignupCard from '../components/SignupCard';

function UserAuth() {
    const [isLoginOption, setIsLoginOption] = useState(true);


    return (
        <Container>
            <div className='w-full flex justify-center font-[poppins]'>
                <div className='bg-white w-full md:w-[50%] py-5 rounded-2xl flex flex-col shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
                    <div className='flex w-full justify-center gap-1 p-4'>
                        <p className={`w-full text-center py-3 text-lg rounded-lg transition-all duration-[0.3s] font-medium cursor-pointer hover:bg-orange-300 ${isLoginOption && "bg-orange-400 hover:bg-orange-400"} `} onClick={()=>setIsLoginOption(true)}>Login</p>
                        <p className={`w-full text-center py-3 text-lg rounded-lg transition-all duration-[0.3s] font-medium cursor-pointer hover:bg-orange-300 ${!isLoginOption && "bg-orange-400 hover:bg-orange-400"} ` } onClick={()=>setIsLoginOption(false)} >Signup</p>
                    </div>
                    {
                        isLoginOption && <LoginCard/>
                    }{
                        !isLoginOption && <SignupCard/>
                    }


                </div>
            </div>
        </Container>
    )
}

export default UserAuth