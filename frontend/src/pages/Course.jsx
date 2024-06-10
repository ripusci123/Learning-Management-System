import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

function Course() {
    const [course, setCourse] = useState({})
    const {courseId} = useParams()
    const [userMetaData, setUserMetaData] = useState({})
    console.log(courseId);
    const toast = useToast({isClosable: true})
    useEffect(() => {
        const getCourse = async () => {
            try {
                const response = await fetch(`/api/user/course/${courseId}`);
                const data = await response.json();
                console.log(data);
                if (data.success === true) {
                    setCourse(data.data.course);
                    setUserMetaData(data.data)
                } else {
                    toast({ title: "An error occurred", description: data.message, status: "error" })
                }

            } catch (error) {
                toast({ title: "An error occurred", description: data.message, status: "error" })
            }
        }
        getCourse();
    }, [courseId])

    const navigate = useNavigate()

    const handleEnrollNow = async (courseId) => {
        try {
            const res = await fetch(`/api/user/enroll-course/${courseId}`);
            const data = await res.json()
            if(data.success == true){
                toast({ title: "Course Enroll successfull", description: data.message, status: "success" })
                navigate('/mycourses')
            }
        } catch (error) {
            toast({ title: "An error occurred", description: data.message, status: "error" })
            return
        }
    }
    

    return (
        <Container>
            <div className='w-full font-[poppins]'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl md:text-2xl text-center md:text-left font-semibold'>{course.title}</h1>
                    <p className='text-xs'>2 Days ago</p>
                </div>
                <div className='mt-10 flex items-center md:flex-row  md:justify-center'>
                    <img className='w-full md:w-[60%] rounded-2xl border border-gray-300' src={course?.poster?.url} alt="" srcset="" />
                </div>
                <div className='flex mt-10 gap-10 justify-between flex-col-reverse sm:flex-row'>
                    <div className='w-[70%] flex flex-col gap-5'>
                        <div>
                            <h1 className='text-md md:text-lg font-semibold mb-3'>Description</h1>
                            <p className='text-sm md:text-md'>
                            {course.description}
                            </p>
                        </div>
                        <div>
                            <h1 className='text-md md:text-lg font-semibold mb-3'>What you'll learn</h1>
                            <ul className='list-disc pl-5 text-sm md:text-md'>
                                <li>Build full-stack web applications</li>
                                <li>Work with databases</li>
                                <li>Write automated tests</li>
                                <li>Deploy your apps to the web</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className='font-medium'>tags</h1>
                            <div className='mt-3 flex gap-2 w-full'>
                                <span className='bg-[#F8F6E3] px-2 py-1 text-sm rounded-md'>React</span>
                                <span className='bg-[#F8F6E3] px-2 py-1 text-sm rounded-md'>Node js</span>
                                <span className='bg-[#F8F6E3] px-2 py-1 text-sm rounded-md'>MongoDB</span>
                            </div>
                        </div>
                    </div>

                    <div className='bg-[#F8F6E3] w-full rounded-2xl p-5 md:w-[30%] flex flex-col gap-5 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
                        <div>
                            <h1 className='text-md md:text-lg text-orange-500 font-semibold mb-3'>Instructor</h1>
                            <div className='flex gap-2 items-center'>
                                <img src="https://bit.ly/ryan-florence" alt="" srcset="" className='h-10 w-10 rounded-full' />
                                <div>
                                    <p className='font-medium'>{course.uploaderName}</p>
                                    <p className='text-xs text-gray-600'>Backend Developer,Amazon</p>
                                    <p className='text-xs text-gray-600'>4yr+ experience</p>
                                </div>

                            </div>
                        </div>
                        <div>
                            <h1 className='mb-2  text-orange-500 text-md md:text-lg font-semibold'>Course Details</h1>
                            <h1 className='text-sm'><span className='font-medium'>Price</span> : {course.price}</h1>
                            <h1 className='text-sm'><span className='font-medium'>Rating</span> : 4.5</h1>
                            <h1 className='text-sm'><span className='font-medium'>Duration</span> : 2 months</h1>
                            <h1 className='text-sm'><span className='font-medium'>Level</span> : Intermediate</h1>
                            {
                            (userMetaData.isLoggedIn && userMetaData.isOpted == false) && 
                            <button className='bg-orange-400 mt-4 text-sm text-white px-5 py-2 rounded-md'
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleEnrollNow(courseId)
                                }}
                            >Enroll Now ↗</button>
                            }
                            
                            {
                            (userMetaData.isLoggedIn && userMetaData.isOpted == true) &&
                            <Link to={`/videos/${courseId}`}>
                            <button className='bg-green-600 mt-4 text-sm text-white px-5 py-2 rounded-md'>Go to Course</button>
                            </Link> 
                            }                           
                        </div>
                    

                    </div>
                </div>

            </div>
        </Container>
    )
}

export default Course