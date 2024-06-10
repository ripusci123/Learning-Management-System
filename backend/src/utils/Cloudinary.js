import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
import { ApiError } from './ApiError.js';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


export const uploadFileOnCloudinary = async(localFilePath)=>{
  try {
    if(!localFilePath) return null
    const response =  await cloudinary.uploader.upload(localFilePath,{
      "resource_type" : "auto"
    })
    //file successfully upload
    fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the image upload operation is failed
    return response; //here  we are returning the object that contains url and public_id of the image.The url of the image  can be used in the frontend to display the images or to store in the database.
    
  } catch (error) {
    fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the image upload operation is failed
    console.log(error.message);
    return null;
  }
}

export const deleteVideoOnCloudinary = async(publicId)=>{
  try {
    await cloudinary.uploader.destroy(publicId,{
      "resource_type" : "video"
    })
  } catch (error) {
    console.log(error.message);
  }
}
export const deleteImageOnCloudinary = async(publicId)=>{
  try {
    await cloudinary.uploader.destroy(publicId,{
      "resource_type" : "image"
    })
  } catch (error) {
    console.log(error.message);
  }
}


export const deleteDocOnCloudinary = async(publicId)=>{
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.log(error.message);
  }
}

