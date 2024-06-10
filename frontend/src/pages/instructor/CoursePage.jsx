import { useToast } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container';
const CoursePage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState({});
    const toast = useToast({ isClosable: true })
    const [videos, setVideos] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [videoData, setVideoData] = useState({ title: '', description: '', file: null });

    // Fetch the course data
    useEffect(() => {
        const getCourse = async () => {
            try {
                const response = await fetch(`/api/uploader/course/${courseId}`);
                const data = await response.json();
                if (data.success === true) {
                    setCourse(data.data);
                    if (data.data.lectures.length > 0) {
                        setVideos(data.data.lectures)
                    }
                    console.log(data);
                } else {
                    toast({ title: "An error occurred", description: data.message, status: "error" })
                }

            } catch (error) {
                toast({ title: "An error occurred", description: data.message, status: "error" })
            }
        }
        getCourse();
    }, [courseId])


    const handleAddVideo = () => {
        setShowAddForm(true);
    };

    const handleInputChange = (e) => {
        setVideoData({ ...videoData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setVideoData({ ...videoData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/uploader/add-lecture/${courseId}`, {
                method: "POST",
                body: new FormData(e.target),
            });
            const data = await res.json();
            if (data.success === false) {
                toast({
                    title: "An error occurred.",
                    description: data.message,
                    status: "error",
                });
            } else {
                setVideos([...videos, {title:videoData.title, description:videoData.description}]);
                // Clear the form data and hide the form
                setShowAddForm(false);
                toast({
                    title: "Lecture Added Successfully.",
                    status: "success",
                });
                setVideoData({ title: '', description: '', file: null });
                window.location.reload();
            }
        } catch (error) {
            toast({
                title: "An error occurred",
                status: "error"
            })
        }

    };

    return (
        <Container>
            <div className='w-full flex justify-center items-center font-[poppins] '>
                <div className='flex justify-center flex-col'>
                    <img src={course.poster?.url} alt="" srcset="" className='rounded-xl' />

                    <div className='mt-3 py-3 px-1 bg-[#F8F6E3] text-gray-600 rounded-xl'>
                        <p className='text-md'>Title : {course.courseTitle}</p>
                        <p className='text-md'>Description : {course.description}</p>
                    </div>

                    {/* lectures are being displayed here and in bottom there is a button of add videos */}
                    <div className="mt-8 bg-[#F8F6E3] px-2 rounded-xl">
                        <div>
                            <h1 className='text-lg font-semibold mt-5'>Lectures</h1>
                            <div className='flex flex-col gap-5 mt-3'>
                                {videos.map((video, index) => (
                                    <div key={index} className='flex gap-2 items-start'>
                                        <p>{index + 1}.</p>
                                        <div className='flex flex-col'>
                                            <a href={video?.video?.url} target='#' className="text-gray-700 font-semibold hover:underline hover:text-orange-500 hover:cursor-pointer">{video?.title}</a>
                                            <p className="text-gray-700 text-xs">{video?.description}</p>
                                        </div>
                                        {/* Display the name of the selected file */}
                                        <p className="text-gray-700">{video?.file?.name}</p>
                                    </div>
                                ))}
                                <div className='w-full flex justify-center'>

                                <button onClick={handleAddVideo} className='bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md my-2 inline'>+ Add Video</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add Video Form */}
                    {showAddForm && (
                        <div className="mt-8">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-3">
                                    <input type="text" name="title" value={videoData?.title} onChange={handleInputChange} placeholder="Title" className="border border-gray-300 rounded-md p-2" />
                                    <textarea name="description" value={videoData?.description} onChange={handleInputChange} placeholder="Description" rows="3" className="border border-gray-300 rounded-md p-2"></textarea>
                                    <input type="file" onChange={handleFileChange} name='video' accept="video/*" className="border border-gray-300 rounded-md p-2" />
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

            </div>
        </Container>
    );
};

export default CoursePage;
