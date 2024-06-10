import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { uploaderAtom } from "../../atoms/uploaderAtom";

function UploadCourse() {
  const [inputs, setInputs] = useState({
    courseTitle: "",
    description: "",
    poster: "",
    price: "",
    category: ""
  });
  const [posterPreview, setPosterPreview] = useState(null); // State for poster preview

  const [uploader, setUploader] = useRecoilState(uploaderAtom);
  const navigate = useNavigate();
  const toast = useToast({ isClosable: true });

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      

      const res = await fetch("/api/uploader/create-course", {
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
        toast({
          title: "Course Uploaded Successfully.",
					status: "success",
        })
        navigate("/instructor/dashboard");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    setInputs({ ...inputs, poster: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileBtnRef = React.useRef();

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white py-10 px-5 rounded-lg">
      <form className="space-y-6" onSubmit={handleUpload}>
        <div>
          <label htmlFor="courseTitle" className="block text-sm font-medium leading-6 text-gray-900">
            Course Title
          </label>
          <div className="mt-2">
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              required
              value={inputs.courseTitle}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 bg-[#e8f0fe] px-1 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              rows="4"
              required
              value={inputs.description}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 bg-[#e8f0fe] px-1 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="poster" className="block text-sm font-medium leading-6 text-gray-900">
            Poster (Upload Image)
          </label>
          <div className="mt-2">
            <button className="bg-orange-400 rounded-lg px-3 py-1 text-white font-semibold" onClick={(e) => {
              e.preventDefault();
              fileBtnRef.current.click();
            }}>Choose Image</button>
            <input
              ref={fileBtnRef}
              hidden
              name="poster"
              accept="image/*"
              type="file"
              required
              onChange={handlePosterChange}
              className="block w-full rounded-md border-0 py-1.5 bg-[#e8f0fe] px-1 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
          {posterPreview && (
            <img
              src={posterPreview}
              alt="Poster Preview"
              className="mt-2 max-h-36 w-auto"
            />
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
            Price
          </label>
          <div className="mt-2">
            <input
              id="price"
              name="price"
              type="text"
              required
              value={inputs.price}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 bg-[#e8f0fe] px-1 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
            Category
          </label>
          <div className="mt-2">

            <input
              id="category"
              name="category"
              type="text"
              required
              value={inputs.category}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 bg-[#e8f0fe] px-1 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="mt-2">

            <label>Document :</label>
            <input
              name="document"
              type="file"
              required
              className="block w-full rounded-md border-0 py-1.5 bg-[#e8f0fe] px-1 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadCourse;
