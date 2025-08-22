import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import adminRoutes from "./routes/admin.route.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
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

export default app