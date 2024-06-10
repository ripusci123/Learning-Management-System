import { React, useState, useRef } from "react";
import Container from "../components/Container";
import ListVideo from "../components/ListVideo";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Video = () => {
  
    const [course, setCourse] = useState({})
    const {courseId} = useParams()
    console.log(courseId);
    const toast = useToast({isClosable: true})
    const [videos, setVideos] = useState([]);
    const [video, setVideo] = useState(null);
    const [document, setDocument] = useState({})

    useEffect(() => {
        const getCourse = async () => {
            try {
                const response = await fetch(`/api/user/course/${courseId}`);
                const data = await response.json();
                console.log(data);
                if (data.success === true) {
                    setCourse(data.data?.course);
                    setVideos(data.data.course?.lectures)
                    setVideo(data.data.course?.lectures[0])
                    setDocument(data.data.course?.document)
                } else {
                    toast({ title: "An error occurred", description: data.message, status: "error" })
                }

            } catch (error) {
                toast({ title: "An error occurred", description: data.message, status: "error" })
            }
        }
        getCourse();
    }, [courseId])

  
  const [isVideosClicked, setIsVideosClicked] = useState(true);


  const videoRef = useRef() 

  useEffect(() => {
    videoRef.current.src = video?.video?.url || null
    videoRef.current.load();
  }, [video])



  return (
    <Container>
      <div className="flex gap-5">
        {/* video player */}
        <div className="w-[80%] flex flex-col gap-5">
          <video ref={videoRef} height="940px" width="full" controls>
            {/* <source ref={videoRef} src={video.src} /> */}
          </video>

          <div>
            <h1 className="font-bold text-3xl ">{video?.title}</h1>
            <p className="font-medium py-4">
              {video?.description}
            </p>
          </div>
        </div>

        {/* video list */}
        <div className="w-[20%] bg-[#F8F6E3] rounded-lg p-3">
          <div className="w-full flex gap-1 border-b-2">
            <p
              className={`text-center w-full px-1 py-2 text-sm cursor-pointer ${
                isVideosClicked && "bg-orange-400"
              }`}
              onClick={() => setIsVideosClicked(true)}
            >
              Videos
            </p>
            <p
              className={`text-center w-full px-1 py-2 text-sm cursor-pointer ${
                !isVideosClicked && "bg-orange-400"
              }`}
              onClick={() => setIsVideosClicked(false)}
            >
              Documents
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4">
          {isVideosClicked && (
            videos.map((video) => <ListVideo key={video?.video?.public_id} video={video} setVideo={setVideo} />)
          )}

          {!isVideosClicked && 
          <a className="hover:underline hover:cursor-pointer text-center" href={document && document?.url } target="_blank">doc</a>
          }
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Video;
