import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Uploader } from "../models/uploader.model.js";

export const verifyUserJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(404,"Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password")
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid Access Token")
    }
})


export const checkUserJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(token){
            const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
            const user = await User.findById(decodedToken?._id).select("-password")
            if(user){
                req.user = user
            }
            
        }
    } catch (error) {
        console.log(error);
    }
    next()
    
})



export const verifyUploaderJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.uploaderAccessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(404,"Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const uploader = await Uploader.findById(decodedToken?._id).select("-password")
        if(!uploader){
            throw new ApiError(401,"Invalid Access Token")
        }
        req.uploader = uploader
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid Access Token")
    }
})
