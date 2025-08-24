/* 
fullName
email
username
password
avatar
isBlocked : Boolean

/api/user/register

/api/user/login

/api/user/profile

/api/user/edit-profile
*/



import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: 6
    },
    avatar: {
        type: String, 
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
}, {timestamps: true})

// Hash Password before saving
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
});

// compare password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Generate AccessToken
userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
        _id: this.id,
        email: this.email,
    },
process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
}
)
}

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id: this.id,
        email: this.email,
    },
process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
}
)
}


export const User = mongoose.model("User", userSchema)