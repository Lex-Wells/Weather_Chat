import express from "express"
const router = express.Router()
import {authUsers,registerUser, logOut,getUserProfile, getAllProfiles} from "../controllers/userController.js"
import { userProtect } from "../middleware/authMiddleware.js"

router.post("/authen", authUsers)  
router.post("/register", registerUser)
router.post("/logout", logOut)
router.get("/profile", userProtect, getUserProfile)
router.get("/", userProtect, getAllProfiles )


export default router