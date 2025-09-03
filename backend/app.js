import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import adminRoutes from "./routes/admin.route.js"
import userRoutes from "./routes/user.route.js"
import blogRoutes from './routes/blog.routes.js'

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Routers
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/api/admin", adminRoutes)
app.use("/api/user", userRoutes)
app.use("/api/blogs", blogRoutes);

export default app
