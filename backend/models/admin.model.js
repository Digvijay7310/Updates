import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const adminSchema = mongoose.Schema({
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
        required: [true, "Password is required"],
        min: 6
    },
    avatar: {
        type: String, 
        required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
}, {timestamps: true})

// Hash Password before saving
adminSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
});

// compare password
adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Generate AccessToken
adminSchema.methods.generateAccessToken = function (){
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
adminSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id: this.id,
        email: this.email,
    },
process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
}
)
}


export const Admin = mongoose.model("Admin", adminSchema)