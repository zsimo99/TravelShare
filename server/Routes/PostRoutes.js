import express from "express"
import { getAllPosts, createPost } from "../controllers/postControllers.js"
import { protect } from "../middlewares/protectRoute.js"

const router = express.Router()

router.route("/").get(getAllPosts).post(protect, createPost)
export default router