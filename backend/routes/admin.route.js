import {Router} from "express";
import {adminLogin, adminLogout, adminSignup, blockUser, deleteUser, getAllUsers, getProfile, getSingleUser, unblockUser, updateProfile} from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";


const router = Router()

router.route("/admin/profile").get(verifyJWT, isAdmin, (req, res) => {
    res.json({admin: req.user});
})


router.route("/register").post(
    upload.single("avatar"),
    adminSignup
)

router.route("/login").post(adminLogin)
router.route("/edit-profile/:id").put(
    verifyJWT,
    upload.single("avatar"),
    updateProfile
)
router.route("/logout").post(verifyJWT, adminLogout)
router.route("/profile/:id").get(verifyJWT, getProfile)

router.route("/users").get(verifyJWT, isAdmin, getAllUsers);
router.route("/users/:id").get(verifyJWT, isAdmin, getSingleUser)
router.route("/users/:id/block").put(verifyJWT, isAdmin, blockUser)
router.route("/users/:id/unblock").put(verifyJWT, isAdmin, unblockUser)
router.route("/users/:id").delete(verifyJWT, isAdmin, deleteUser)

/*
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password/:token").post(resetPassword)
*/


export default router;