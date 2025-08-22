import { AsyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js';
import {ApiResponse} from "../utils/ApiResponse.js"
import { Admin } from '../models/admin.model.js';
import uploadOnCloudinary from "../utils/cloudinary.js"
import fs from "fs"
import crypto from "node:crypto"


const adminSignup = AsyncHandler(async (req, res, next) => {
    const {fullName, email, password} = req.body;
    const file = req.file;

    // Set isProduction flage based on .env
     const isProduction = process.env.NODE_ENV === "PRODUCTION"

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
     const isProduction = process.env.NODE_ENV === "PRODUCTION"

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
            email: admin.fullName,
            avatar: admin.avatar
        }, "Profile fetched successfully")
    )
})

// Forgot Password
// Token generator
const generateResetToken = () => {
    return crypto.randomBytes(32).toString("hex");
};

const forgotPassword = AsyncHandler(async(req, res) => {
    const {email} = req.body;

    if(!email) throw new ApiError(401, "Email is required");

    const admin = await Admin.findOne({email})
    if(!admin) throw new ApiError(404, "Admin not found");

    // Generate token
    const resetToken = generateResetToken();
    const expiry = Date.now() + 1000 * 60 * 10

    admin.resetPasswordToken = resetToken;
    admin.resetPasswordExpiry = expiry;

    await admin.save();
    // Here we can add the resetToken via email
    // For now just respond with it 
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

    return res.status(200).json(
        new ApiResponse(201, {resetLink}, "Reset Link sent")
    )
})

// reset Password
const resetPassword = AsyncHandler(async (req, res) => {
    const {token} = req.params;
    const {newPassword} = req.body;

    if(!token || !newPassword){
        throw new ApiError(401, "Token and new password are required");
    }

    const admin = await Admin.findOne({
        resetPasswordToken: token,
        resetPasswordExpiry: { $gt: Date.now()}
    });

    if(!admin){
        throw new ApiError(401, "Invalid or expired token")
    }

    admin.password = newPassword;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpiry = undefined;

    await admin.save()

    return res.status(200).json(
        new ApiResponse(201, null, "Password reset successfully")
    )
})
export {adminSignup, adminLogin, updateProfile,
 getProfile, forgotPassword, resetPassword}