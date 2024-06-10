import React from "react";

const ListVideo = ({ video, setVideo }) => {
  return (
    <div className="w-full border-b-2">
      <button
        className="w-full"
        onClick={(e) => {
          e.preventDefault()
          setVideo({
            video: {
              url: video?.video?.url,
              },
              title: video?.title,
              description: video?.description
          });
          console.log(video.video);
        }}
      >
        {video.title}
      </button>
    </div>
  );
};

export default ListVideo;
