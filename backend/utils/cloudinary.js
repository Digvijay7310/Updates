import dotenv from "dotenv"
dotenv.config()

import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    
})



const uploadOnCloudinary = async(localfilePath)=> {
    try {
        if(!localfilePath) return null;

        // Upload on Cloudinary
        const response = await cloudinary.uploader.upload(localfilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        console.log("Uploaded on cloudinary: ", response.url)


        // delete local file after upload
        fs.unlinkSync(localfilePath)
        return response;
    } catch (error) {
        console.error("Cloudinary upload failed: ", error.message)

        if(fs.existsSync(localfilePath) ){
            fs.unlinkSync(localfilePath) 
        } // remove temporary file
        return null;
    }
}


export default uploadOnCloudinary;