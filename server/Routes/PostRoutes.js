import express from "express"
import { getAllPosts, createPost, updatePost } from "../controllers/postControllers.js"
import { protect } from "../middlewares/protectRoute.js"

const router = express.Router()

router.route("/").get(getAllPosts).post(protect, createPost)
router.route('/:id').patch(updatePost)
export default router