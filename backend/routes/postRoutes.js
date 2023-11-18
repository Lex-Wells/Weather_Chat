import express from "express"
const router = express.Router()
import { userProtect } from "../middleware/authMiddleware.js"
import { makePost, getAllPosts, getUserPost,updatePost, getById,deletePost,likePost,getPostByLocation,changeEditing  } from "../controllers/postController.js"


router.get("/", userProtect, getAllPosts)
router.post("/create-post",  makePost)  
router.get("/:id",  getUserPost)
router.put("/updatepost/:id", updatePost)
router.delete("/:postId",userProtect,  deletePost )
router.put('/like/:postId', likePost);
router.put('/editing/:postId',userProtect,  changeEditing);
router.get("/search/:location",  getPostByLocation)

export default router   