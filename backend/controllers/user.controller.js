import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { loginSchema, registerSchema } from "../validator/user.validator.js";

/* ===========================
   REGISTER USER
=========================== */
export const registerUser = AsyncHandler(async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) throw new ApiError(400, error.details[0].message);

  const { fullName, email, password, description } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  if (!req.file) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatarUploaded = await uploadOnCloudinary(req.file.path);
  if (!avatarUploaded?.secure_url) {
    throw new ApiError(500, "Avatar upload failed");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: avatarUploaded.secure_url,
    description,
  });

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

  res.status(201).json(
    new ApiResponse(
      201,
      {
        user,
        accessToken,
        refreshToken,
      },
      "User registered successfully"
    )
  );
});

/* ===========================
   LOGIN USER
=========================== */
export const loginUser = AsyncHandler(async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) throw new ApiError(400, error.details[0].message);

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "Invalid email or password");
  }

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

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

  res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        accessToken,
        refreshToken,
      },
      "Login successful"
    )
  );
});

/* ===========================
   LOGOUT USER
=========================== */
export const logoutUser = AsyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Logout successful"));
});

/* ===========================
   REFRESH ACCESS TOKEN
=========================== */
export const refreshAccessToken = AsyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token required");
  }

  let decoded;
  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch (err) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await User.findById(decoded._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const newAccessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 4,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.json(
    new ApiResponse(
      200,
      { accessToken: newAccessToken },
      "Access token refreshed"
    )
  );
});

/* ===========================
   UPDATE PROFILE
=========================== */
export const updateProfile = AsyncHandler(async (req, res) => {
  const { fullName, description } = req.body;

  const updateData = {};
  if (fullName) updateData.fullName = fullName;
  if (description) updateData.description = description;

  if (req.file) {
    const uploaded = await uploadOnCloudinary(req.file.path);
    if (uploaded?.secure_url) {
      updateData.avatar = uploaded.secure_url;
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    updateData,
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated"));
});

/* ===========================
   MY PROFILE
=========================== */
export const myProfile = AsyncHandler(async (req, res) => {
  const user = req.user;

  if (user.isBlocked) {
    throw new ApiError(403, "Your account is blocked");
  }

  const totalBlogs = await Blog.countDocuments({
    author: user._id,
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        stats: { totalBlogs },
      },
      "Profile fetched successfully"
    )
  );
});

/* ===========================
   OTHER USER PROFILE
=========================== */
export const getUsersProfile = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const totalBlogs = await Blog.countDocuments({
    author: user._id,
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        stats: { totalBlogs },
      },
      "User profile fetched"
    )
  );
});

/* ===========================
   USER STATS
=========================== */
export const getUserStats = AsyncHandler(async (req, res) => {
  const blogs = await Blog.find({ author: req.user._id }).select("likes");

  const totalBlogs = blogs.length;
  const totalLikes = blogs.reduce(
    (sum, blog) => sum + (blog.likes?.length || 0),
    0
  );

  res.json(
    new ApiResponse(
      200,
      { totalBlogs, totalLikes },
      "User stats fetched"
    )
  );
});
