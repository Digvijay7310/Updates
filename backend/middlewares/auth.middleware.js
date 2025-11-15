import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'

export const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        if(!token) {
            throw new ApiError(404, "Unauthorized access token not found")
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decoded._id).select("-password")
        if(!req.user) throw new ApiError(401, "Invalid ACCESS TOKEN")
            next()
    } catch (error) {
        next(new ApiError(401, error.message || "Invalid Token"))
    }
}