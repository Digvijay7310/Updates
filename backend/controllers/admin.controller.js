import { AsyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js';
import {ApiResponse} from "../utils/ApiResponse.js"
import { Admin } from '../models/admin.model.js';
import { User } from '../models/user.model.js';
import { Blog } from '../models/blog.model.js';
import uploadOnCloudinary from "../utils/cloudinary.js"
import fs from "fs"


const adminSignup = AsyncHandler(async (req, res, next) => {
    const {fullName, email, password} = req.body;
    const file = req.file;

    // Set isProduction flage based on .env
     const isProduction = process.env.NODE_ENV === "production"

    // Validate inputs
    if(!fullName || !email || !password || !file){
        throw new ApiError(400, "All Fields (fullName, email, password, avatar) is required")
    }

    // Check if admin already exist or not 
    const existingAdmin = await Admin.findOne({email});
    if(existingAdmin){
        throw new ApiError(409, "Admin already exists with this email");
    }

    // Upload avatar to cloudinary
    const cloudinaryResult = await uploadOnCloudinary(file?.path)
    if(!cloudinaryResult || !cloudinaryResult.secure_url){
        if(fs.existsSync(file.path)) fs.unlinkSync(file.path)
        throw new ApiError(500, "Avatar upload failed");
    }

    // Create admin
    const newAdmin = await Admin.create({
        fullName,
        email,
        password,
        avatar: cloudinaryResult.secure_url
    });

    // Genereate tokens
    const accessToken = newAdmin.generateAccessToken();
    const refreshToken = newAdmin.generateRefreshToken();

    // set cookies
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none": "lax",
        maxAge: 1000 * 60 * 60 * 4,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none": "lax",
        maxAge: 1000 * 60 * 60 * 7
    })

    // Send Response
    return res.status(201).json(
        new ApiResponse(201,{
            _id: newAdmin._id,
            fullName: newAdmin.fullName,
            email: newAdmin.email,
            avatar: newAdmin.avatar
        }, "Admin registered successfully")
    )
})

// Login
const adminLogin = AsyncHandler(async (req, res, next) => {
    const {email, password} = req.body;

       // Set isProduction flage based on .env
     const isProduction = process.env.NODE_ENV === "production"

    if(!email || !password){
        throw new ApiError(400, "Email and password are required")
    }

    const admin = await Admin.findOne({email});
    if(!admin){
        throw new ApiError(404, "Admin not found")
    }

    const isPasswordValid = await admin.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401, 'Invalid credentials')
    }

    const accessToken = admin.generateAccessToken()
    const refreshToken = admin.generateRefreshToken();

     res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none": "lax",
        maxAge: 1000 * 60 * 60 * 4,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none": "lax",
        maxAge: 1000 * 60 * 60 * 7
    })

    // Send Response
    return res.status(201).json(
        new ApiResponse(201,{
            _id: admin._id,
            fullName: admin.fullName,
            email: admin.email,
            avatar: admin.avatar,
            accessToken,
            refreshToken
        }, "login successfully")
    )
})

// Logout 
const adminLogout = AsyncHandler(async (req, res) => {
    const admin = req.user;


     // Set isProduction flage based on .env
     const isProduction = process.env.NODE_ENV === "PRODUCTION";

    if(admin){
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: isProduction,
            sameSite:  isProduction ? "none" : "lax",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        });
        return res.status(201).json(
            new ApiResponse(201, {
                _id: admin.id,
                email: admin.email
            }, "Admin logout successfully")
        )
    } else {
        return res.status(400).json(
            new ApiResponse(400, {}, "No admin logged in")
        )
    }
})

// Edit 
const updateProfile = AsyncHandler(async (req, res) => {
    const adminId = req.user._id;
    const {fullName} = req.body;
    const file = req.file;

    const admin = await Admin.findById(adminId);
    if(!admin) {
        throw new ApiError(404, "Admin not found")
    }

    if(fullName){
        admin.fullName = fullName
    }


    if(file) {
        const cloudinaryResult = await uploadOnCloudinary(file.path);
        if(!cloudinaryResult){
            if(fs.existsSync(file.path)) fs.unlinkSync(file.path);
            throw new ApiError(500, "Avatar upload failed");
        }
        // Add the route latar to delte the old avatar

    admin.avatar = cloudinaryResult.secure_url;
    }

    await admin.save();
    
    return res.status(201).json(
        new ApiResponse(201, {
            _id: admin._id,
            fullName: admin.fullName,
            email: admin.email,
            avatar: admin.avatar
        }, "Profile updated successfully")
    )
})

// See Profile 
const getProfile = AsyncHandler(async (req, res) => {
    const admin = req.user;

    return res.status(200).json(
        new ApiResponse(200, {
            _id: admin._id,
            fullName: admin.fullName,
            email: admin.email,
            avatar: admin.avatar
        }, "Profile fetched successfully")
    )
})

// Get all users 
const getAllUsers = AsyncHandler(async (req, res) => {
    const users = await User.find().select("-password");

    return res.status(200).json(
        new ApiResponse(200, users, "All users fetched successfully")
    )
})

const getSingleUser = AsyncHandler(async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id).select("-password");

    if(!user){
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(
        new ApiResponse(200, user, "User fetched successfully")
    );
});

// Block user
const blockUser = AsyncHandler(async (req, res) => {
    const {id} = req.params;

    const user  = await User.findById(id);
    if(!user) throw new ApiError(404, "User not found");

    if(user.isBlocked) {
        throw new ApiError(400, "User is already blocked");
    }

    user.isBlocked = true;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, {}, "User blocked successfully")
    );
});

// UnBlocked user 
const unblockUser = AsyncHandler(async (req, res) => {
    const {id} = req.params;

    const user = await User.findById(id);
    if(!user) throw new ApiError(404, "User not found");

    if(!user.isBlocked){
        throw new ApiError(400, "User is not blocked");
    }

    user.isBlocked = false;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, {}, "User unblocked successfully")
    )
})

const deleteUser = AsyncHandler(async (req, res) => {
    const {id} = req.params;

    const user = await User.findById(id);
    if(!user) throw new ApiError(404, "User not found");

    const blogs = await Blog.find({author: id})

    await blogs.deleteMany();

    await user.deleteOne();
    return res.status(200).json(
        new ApiResponse(200, {}, "User deleted successfully")
    )
})


export {adminSignup, adminLogin, adminLogout,
 updateProfile, getProfile, getAllUsers,
  getSingleUser, blockUser, unblockUser,
   deleteUser }