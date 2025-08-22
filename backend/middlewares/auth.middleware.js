import jwt from 'jsonwebtoken'
import {Admin} from "../models/admin.model.js"
import {ApiError} from "../utils/ApiError.js"
import {AsyncHandler} from "../utils/AsyncHandler.js"

export const verifyJWT = AsyncHandler(async(req, res, next) => {
    const token = req.cookies?.accessToken;

    if(!token){
        throw new ApiError(401, "Unauthorized: No token provided");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await Admin.findById(decoded._id).select("-password")
    if(!req.user){
        throw new ApiError(401, "User not found")
    }
    next();
})