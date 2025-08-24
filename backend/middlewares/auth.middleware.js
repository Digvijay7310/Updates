import jwt from 'jsonwebtoken'
import {Admin} from "../models/admin.model.js"
import {ApiError} from "../utils/ApiError.js"
import {AsyncHandler} from "../utils/AsyncHandler.js"
import { User } from '../models/user.model.js'

export const verifyJWT = AsyncHandler(async(req, res, next) => {
    const token = req.cookies?.accessToken;

    if(!token){
        throw new ApiError(401, "Unauthorized: No token provided");
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error){
        throw new ApiError(401, "Invalid Token");
    }
    
    // Find user in admin first
    let user = await Admin.findById(decoded._id).select("-password")
    
    // If not found is Admin, check user
    if(user){
        req.user = user;
        req.userModel = "Admin";
        return next();
    }
    
    // If not found in admin. check user
    user = await User.findById(decoded._id).select("-password");

   
        if(user){
            req.user = user;
            req.userModel = "User";
            return next();
        } 
            throw new ApiError(401, "User not found");

})