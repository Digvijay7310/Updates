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
    password: {
        type: String,
        min: 3,
        required: [true, "Password is required"],
    },
    avatar: {
        type: String, 
        required: true,
    },
    role:{
        type: String,
        default: "user"
    },
    description: {
        type: String,
        default: "Hey there! I am using GetUpdates.",
        required: true,
        max: 500,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
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

userSchema.index({fullName: "text"});


export const User = mongoose.model("User", userSchema)