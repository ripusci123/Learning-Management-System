import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Uploader } from "../models/uploader.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteDocOnCloudinary, deleteImageOnCloudinary, deleteVideoOnCloudinary, uploadFileOnCloudinary } from "../utils/Cloudinary.js";
import jwt from "jsonwebtoken"
import { Course } from "../models/course.model.js";
import fs from "fs"

const generateAccessToken = async (userId) => {
    try {
        const uploader = await Uploader.findById(userId)
        const accessToken = await uploader.generateAccessToken()

        return accessToken;

    } catch (error) {
        throw new ApiError(500, "Error occued while generating access and refresh token")
    }
}


export const registerUploader = asyncHandler(async (req, res) => {

    const { fullName, email, password,company,designation,experience } = req.body;

    if ([fullName, email, password].some((field) => (field?.trim() === ""))) {
        throw new ApiError(400, "All fields are mandatory")
    }

    const existedUploader = await Uploader.findOne({ email })

    if (existedUploader) {
        const avatarLocalPath = req?.file.path;
        fs.unlinkSync(avatarLocalPath)
        throw new ApiError(409, "Instructor with same email already exists")
    } else {

        const avatarLocalPath = req.file.path;

        console.log(avatarLocalPath);

        if (!avatarLocalPath) {
            throw new ApiError(400, "avatar required")

        }

        const avatar = await uploadFileOnCloudinary(avatarLocalPath)

        const newUploader = await Uploader.create({
            fullName,
            email,
            password,
            avatar: {
                public_id: avatar.public_id,
                url: avatar.secure_url
            },
            company,
            designation,
            experience,
            isInstructor: true
        })

        const uploaderCreated = await Uploader.findById(newUploader._id).select("-password -refreshToken")  // checking if the new uploader is available on mongodb

        const accessToken = await generateAccessToken(uploaderCreated._id)
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 24 * 60 * 60 * 1000, //15 days
        }

        if (uploaderCreated) {
            res.status(201).cookie("uploaderAccessToken", accessToken, cookieOptions).json(
                new ApiResponse(200, uploaderCreated, "uploader Created Successfully")
            )
        } else {
            throw ApiError(500, "Something error occurred while creating uploader.Try Again")
        }
    }

})

export const loginUploader = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, "Email Required")
    }
    if (!password) {
        throw new ApiError(400, "Password Required")
    }

    const uploader = await Uploader.findOne({ email })
    if (!uploader) {
        throw new ApiError(404, "uploader does not exists")
    }
    const isPasswordValid = await uploader.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid uploader credentials")
    }

    const accessToken = await generateAccessToken(uploader._id)
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 15 * 24 * 60 * 60 * 1000, //15 days
    }

    const loggedInUploader = await Uploader.findById(uploader._id).select("-password")


    return res.status(200).cookie("uploaderAccessToken", accessToken, cookieOptions).json(new ApiResponse(200, loggedInUploader, "Uploader LoggedIn Successfully"))


})

export const logoutUploader = asyncHandler(async (req, res) => {

    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 1
    }

    return res.status(200)
        .clearCookie("uploaderAccessToken", options).json(new ApiResponse(200, {}, "Uploader logged out"))

})

export const getCurrentUploader = asyncHandler(async (req, res) => {
    const currentUploader = req.uploader
    console.log(currentUploader);
    return res.status(200).json(new ApiResponse(200, currentUploader, "Current User details fetched successfully"))
})

export const updateProfile = asyncHandler(async (req, res) => {
    const { fullName, email,password } = req.body;
    const uploaderId = req.uploader._id;

    const uploader = await Uploader.findById(uploaderId);


    if(email){
        const existingUploader = await Uploader.findOne({ email })
        if (existingUploader) {
            throw new ApiError(409, "Uploader with same email already exists")
        }
    }

    if(req.file){
        const existingAvatarId = uploader.avatar.public_id;
        await deleteImageOnCloudinary(existingAvatarId)
        
        const avatarLocalPath = req.file.path;
        const cloudAvatar = await uploadFileOnCloudinary(avatarLocalPath)
        uploader.avatar.public_id = cloudAvatar.public_id
        uploader.avatar.url = cloudAvatar.secure_url
    }
    
    uploader.fullName = fullName || uploader.fullName;
    uploader.email = email || uploader.email;
    uploader.password = password || uploader.password;
    
    await uploader.save({ validateBeforeSave: false })

    res.status(200).json(new ApiResponse(200, null, "Profile updated successfully"));

})


//courses apis

export const createCourse = asyncHandler(async (req, res) => {

    const uploaderId = req.uploader?._id
    const uploader = await Uploader.findById(uploaderId)

    if (!uploader) {
        throw new ApiError(404, "Uploader not found");
    }

    const { courseTitle, description, category, price } = req.body
    if ([courseTitle, description, category, price].some((field) => (field?.trim() === ""))) {
        throw new ApiError(400, "All fields are mandatory")
    }

    //check is there any course title already present.if yes then return error
    let existingCourse = await Course.findOne({ courseTitle,isDeleted:false })
    if (existingCourse) {
        const posterLocalPath = req?.files?.poster[0]?.path
        const documentLocalPath = req?.files?.document[0]?.path
        fs.unlinkSync(posterLocalPath)
        fs.unlinkSync(documentLocalPath)
        throw new ApiError(409, "Course with same title already exists")
    }




    const posterLocalPath = req?.files?.poster[0]?.path
    console.log("poster",posterLocalPath);
    if (!posterLocalPath) {
        throw new ApiError(400, "Poster  is required");
    }
    const documentLocalPath = req?.files?.document[0]?.path
    console.log("doc",documentLocalPath);
    const cloudPoster = await uploadFileOnCloudinary(posterLocalPath)
    const cloudDocument = await uploadFileOnCloudinary(documentLocalPath)

    const newCourse = await Course.create({
        courseTitle, description, category, price,
        uploaderId: uploader._id,
        uploaderName: uploader.fullName,
        poster: {
            public_id: cloudPoster.public_id,
            url: cloudPoster.secure_url
        },
        document: {
            public_id: cloudDocument.public_id,
            url: cloudDocument.secure_url
        }
    })

    const createdCourse = await Course.findById(newCourse._id);

    console.log(createdCourse);;
    if (!createdCourse) {
        throw new ApiError(400, "Error in creating course.")
    }

    uploader.uploadedCourses.push({ courseId: createdCourse._id });

    await uploader.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, null, "Course created successfully"))
})

export const getCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params
    if (!courseId) {
        throw new ApiError(400, "Provide Course Id")
    }
    const course = await Course.findById(courseId)
    if (!course) {
        throw new ApiError(404, "Course with provided Id does not exists")
    }

    if (course.isDeleted) {
        throw new ApiError(404, "Course with provided Id has been deleted")
    }

    //check if course is uploaded by this user
    const uploader = req.uploader;
    const isCourseUploadedByUser = uploader.uploadedCourses.some((course) => course.courseId.toString() === courseId.toString())
    if (!isCourseUploadedByUser) {
        throw new ApiError(404, "Course is not uploaded by you")
    }

    course.lectures = course.lectures.filter(lecture => lecture.isDeleted === false)

    return res.status(200).json(
        new ApiResponse(200, course, "Course fetched successfully"))
})


export const getUploadedCourses = asyncHandler(async (req, res) => {
    const uploaderId = req.uploader._id;
    // const uploader = await Uploader.findById(uploaderId);

    //search only course that has isDeleted : false

    const courses = await Course.find({uploaderId, isDeleted : false});
    // const courses = await Course.find({ uploaderId: uploader._id, isDeleted: false })
    res.status(200).json(new ApiResponse(200, courses.map(course => (course.lectures = course.lectures.filter(lecture => lecture.isDeleted === false), course)), "Uploaded courses fetched successfully"))
})



export const deleteCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params
    console.log(courseId);
    if (!courseId) {
        throw new ApiError(400, "Provide Course Id")
    }
    const course = await Course.findById(courseId)

    if (course.uploaderId.toString() !== req.uploader._id.toString()) {
        throw new ApiError(403, "You are not authorized delete this course")
    }
    

    await Course.findByIdAndUpdate(courseId, {
        $set: {
            isDeleted: true
        }
    })

    return res.status(200).json(
        new ApiResponse(200, null, "course deleted successfully")
    )

})

export const editCourse = asyncHandler(async (req, res) => {

    const courseId = req.params.courseId
    const { courseTitle, price, description, category } = req.body

    if (!courseId) {
        throw new ApiError(404, "Provide course id")
    }

    let course = await Course.findById(courseId).select("-optedBy");

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    if (course.uploaderId.toString() !== req.uploader._id.toString()) {
        throw new ApiError(403, "You are not authorized to edit this lecture")
    }


    //check is there any course title already present.if yes then return error
    if (courseTitle) {
        let existingCourse = await Course.findOne({ courseTitle })
        if (existingCourse) {
            throw new ApiError(409, "Course with same title already exists")
        }
    }

    if (req?.files?.poster) {

        const existingPoster = course.poster.public_id;
        await deleteImageOnCloudinary(existingPoster);

        const posterLocalPath = req?.files?.poster[0]?.path;

        const cloudPoster = await uploadFileOnCloudinary(posterLocalPath)

        course.poster.public_id = cloudPoster.public_id
        course.poster.url = cloudPoster.secure_url
    }

    if (req?.files?.document) {

        const existingDoc = course.document.public_id;
        await deleteDocOnCloudinary(existingDoc);

        const docLocalPath = req?.files?.document[0]?.path;

        const cloudDoc = await uploadFileOnCloudinary(docLocalPath)

        course.document.public_id = cloudDoc.public_id
        course.document.url = cloudDoc.secure_url
    }

    course.price = price || course.price
    course.description = description || course.description
    course.category = category || course.category
    course.courseTitle = courseTitle || course.courseTitle

    await course.save()

    return res
        .status(200)
        .json(new ApiResponse(200, null, "course updated successfully"))
})


//lectures API

export const addLecture = asyncHandler(async (req, res) => {
    const { courseId } = req.params

    let course = await Course.findById(courseId);
    if (course.uploaderId.toString() !== req.uploader._id.toString()) {
        throw new ApiError(403, "You are not authorized add lecture to this course")
    }

    const { title, description } = req.body

    const videoLocalPath = req.file?.path;
    if (!videoLocalPath) {
        throw new ApiError(400, "video required")
    }

    const cloudVideo = await uploadFileOnCloudinary(videoLocalPath)


    course.lectures.push({
        title,
        description,
        video: {
            public_id: cloudVideo.public_id,
            url: cloudVideo.secure_url
        },
        isDeleted: false
    })

    course.numOfVideos = course.lectures.length
    await course.save({ validateBeforeSave: false })


    return res.status(200).json(
        new ApiResponse(200,
            {
                public_id: cloudVideo.public_id,
                url: cloudVideo.secure_url
            },
            "Lecture Added Successfully"
        )
    )
})

export const deleteLecture = asyncHandler(async (req, res) => {
    const { courseId, lectureId } = req.query;
    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError("Course no found")
    }

    if (course.uploaderId.toString() !== req.uploader._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this lecture")
    }

    const lecture = course.lectures.find((lecture) => lecture._id.toString() === lectureId.toString())

    if (!lecture) {
        throw new ApiError(404, "Lecture not found")
    }

    // deleteVideoOnCloudinary(lecture.video.public_id)

    lecture.isDeleted = true
    course.numOfVideos -= 1
    await course.save({ validateBeforeSave: false })

    return res.status(200).json(
        new ApiResponse(200, null, "Lecture deleted Successfully")
    )
})

export const editLecture = asyncHandler(async (req, res) => {
    const { lectureId, courseId } = req.query;
    let course = await Course.findById(courseId);

    console.log(course);
    if (!course) {
        throw new ApiError("Course no found")
    }

    if (course.uploaderId.toString() !== req.uploader._id.toString()) {
        throw new ApiError(403, "You are not authorized to edit this lecture")
    }

    let lecture = course.lectures.find((lecture) => lecture._id.toString() === lectureId.toString())

    if (!lecture) {
        throw new ApiError(404, "Lecture not found")
    }

    const { title, description } = req.body

    if (req.file) {

        const existingLectureId = lecture.video.public_id;
        await deleteVideoOnCloudinary(existingLectureId)

        const videoLocalPath = req.file.path;
        const cloudVideo = await uploadFileOnCloudinary(videoLocalPath)
        lecture.video.public_id = cloudVideo.public_id
        lecture.video.url = cloudVideo.secure_url
    }

    lecture.title = title || lecture.title
    lecture.description = description || lecture.description

    await course.save()

    return res.status(200).json(new ApiResponse(200, lecture, "Lecture updated successfully"))


})

export const getLectures = asyncHandler(async (req, res) => {
    const { courseId } = req.params
    const course = await Course.findById(courseId)

    if (!course) {
        throw new ApiError(404, "Course not found")
    }

    if (course.isDeleted) {
        throw new ApiError(404, "Course has been deleted")
    }

    const lectures = course.lectures.filter((lecture) => !lecture.isDeleted)

    return res.status(200).json(
        new ApiResponse(200, lectures, "Lectures fetched successfully")
    )
})


export const getUploader = asyncHandler(async (req, res) => {
    const { uploaderId } = req.params
    const uploader = await Uploader.findById(uploaderId).select("-password -uploadedCourses")

    if (!uploader) {
        throw new ApiError(404, "Uploader not found")
    }

    return res.status(200).json(
        new ApiResponse(200, uploader, "Uploader fetched successfully")
    )
})











