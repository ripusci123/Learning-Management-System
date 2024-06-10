import { Uploader } from "../models/uploader.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isUploader = asyncHandler(async(req,res,next)=>{
    const uploaderId = req.uploader?._id
    if(!uploaderId){
        throw new ApiError(400,"Unauthorized Access login as a uploader first")
    }
    const uploader = await Uploader.findById(uploaderId)
    if(uploader.isInstructor === true){
        next()
    }
})