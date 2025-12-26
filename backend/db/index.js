import mongoose from 'mongoose'
import { DB_NAME } from '../constant/constants.js'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Mongodb connected: || DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection Error: ", error)
    }
}

export default connectDB;