import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";



const userRegister = AsyncHandler(async(req, res) => {
    const {fullName, email, username, password} = req.body;
    const file = req.file;

    if(!fullName || !email || !username || !password || !file){
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({$or: [{email}, {username}]});
    if(existingUser) throw new ApiError(409, "User already exists");

    const avatarUpload = await uploadOnCloudinary(file.path);
    if(!avatarUpload || !avatarUpload.secure_url){
        throw new ApiError(500, "Avatar upload failed");
    }

    const user = await User.create({
        fullName,
        email,
        username,
        password,
        avatar: avatarUpload.secure_url,
    });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none": "lax",
        maxAge: 1000 * 60 * 60 * 4,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(201).json(
        new ApiResponse(201, {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            avatar: user.avatar,
        }, "User registered successfully")
    )
})


 const userLogin = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) throw new ApiError(400, "Email and password required");

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 4,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json(
        new ApiResponse(200, {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            avatar: user.avatar,
            accessToken,
            refreshToken
        }, "User logged in successfully")
    );
});



 const userLogout = AsyncHandler(async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json(
        new ApiResponse(200, {}, "Logged out successfully")
    );
});


 const getUserProfile = AsyncHandler(async (req, res) => {
    const user = req.user;

    return res.status(200).json(
        new ApiResponse(200, {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            avatar: user.avatar,
        }, "Profile fetched successfully")
    );
});


 const updateUserProfile = AsyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { fullName, username } = req.body;
    const file = req.file;

    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    if (fullName) user.fullName = fullName;
    if (username) user.username = username;

    if (file) {
        const avatarUpload = await uploadOnCloudinary(file.path);
        if (!avatarUpload || !avatarUpload.secure_url) {
            throw new ApiError(500, "Avatar upload failed");
        }
        user.avatar = avatarUpload.secure_url;
    }

    await user.save();

    return res.status(200).json(
        new ApiResponse(200, {
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        }, "Profile updated successfully")
    );
});


export {userRegister, userLogin, userLogout, getUserProfile, updateUserProfile}
