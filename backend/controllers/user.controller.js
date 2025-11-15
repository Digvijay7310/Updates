import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";
import { Blog } from '../models/blog.model.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { loginSchema, registerSchema } from "../validator/user.validator.js";


export const registerUser = AsyncHandler(async(req, res) => {
    const {error} = registerSchema.validate(req.body)
    if(error) throw new ApiError(400, error.details[0].message)

        const {fullName, email, password, description} = req.body;

        const exisitingUser = await User.findOne({email})
        if(exisitingUser) {
            throw new ApiError(409, "Email already exists")
        }

        const avatarFile = req.file?.path;
        const avatarUploaded = await uploadOnCloudinary(avatarFile)
        if(!avatarUploaded) throw new ApiError(500, "Avatar upload failed")

            const user = await User.create({
                fullName, 
                email,
                password,
                avatar: avatarUploaded.url,
                description,
            })

            const accessToken = user.generateAccessToken()
            const refreshToken = user.generateRefreshToken()

            res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 4,
    })
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    })
            res.status(200)
            .json(new ApiResponse(201, {user, accessToken, refreshToken}, "User registered."))
});

export const loginUser = AsyncHandler(async(req, res) => {
    const {error} = loginSchema.validate(req.body)
    if(error){
        throw new ApiError(400, error.details[0].message)
    }
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user) {
        throw new ApiError(404, "User with this email not found")
    }
    const isCorrect = await user.isPasswordCorrect(password)
    if(!isCorrect){
        throw new ApiError(401, "Incorrect password")
    }
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 4,
    })
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    })

    res.status(200)
    .json(new ApiResponse(200,{user, accessToken, refreshToken}, "Login successfull"))
})

export const logoutUser = AsyncHandler(async(req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    })
    return res.status(200)
    .json(new ApiResponse(200, {}, "Logout sucessfull"))
})

export const refreshAccessToken = AsyncHandler(async (req, res) => {
    const {refreshToken} = req.body;

    if(!refreshToken) throw new ApiError(401, "Refresh token required")
        let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    } catch (error) {
        throw new ApiError(401, "Invalid refresh token")
    }
    const user = await User.findById(decoded._id)
    if(!user) {
        throw new ApiError(404, "USer not found")
    }
    const newAccess = user.generatAccessToken()
    const newRefresh = user.generateRefreshToken()

    res.json(new ApiResponse(200, {accessToken: newAccess, refreshToken: newRefresh}))
})

export const updateProfile = AsyncHandler(async (req, res) => {
    const {fullName, description} = req.body;
    const updateData = {fullName, description};

    if(req.file){
        const uploaded = await uploadOnCloudinary(req.file.path);
        updateData.avatar = uploaded.url;
    }
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
        new: true,
    })
    res.status(200).json(new ApiResponse(200, updatedUser, 'Profile updated'))
})

export const getUserProfile = AsyncHandler(async (req, res) => {
    const user = req.user;

    if (user.isBlocked) {
        throw new ApiError(403, "Your account is blocked");
    }

    // Fetch user's blogs
    const blogs = await Blog.find({ author: user._id }).select("_id likes");

    // Count total blogs and total likes
    const totalBlogs = blogs.length;

    res.status(200).json(
        new ApiResponse(200, {
            user,
            stats: { totalBlogs }
        }, "User profile fetched successfully")
    );
});

export const getUserStats = AsyncHandler(async(req, res) => {
    const blogs = await Blog.find({author: req.user._id}).select("_id likes")

    const totalBlogs = blogs.length;
    const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes.length, 0)

    res.json(new ApiResponse(200, {totalBlogs, totalLikes}))
})