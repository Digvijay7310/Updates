import express from 'express'
import { getUserProfile, getUserStats, loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user.controller.js"
import { verifyJWT } from '../middlewares/auth.middleware.js'
import {upload} from '../middlewares/multer.middleware.js'

const router = express.Router()

router.post("/register", upload.single("avatar"), registerUser)
router.post('/login', loginUser)

router.post("/logout", verifyJWT, logoutUser)
router.put("/update-profile", verifyJWT, upload.single("avatar"), updateProfile)
router.get("/stats", verifyJWT, getUserStats)
router.get("/profile", verifyJWT, getUserProfile)
export default router;