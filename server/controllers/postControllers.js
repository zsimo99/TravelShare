import asyncHandler from "express-async-handler";
import Post from "../models/PostModel.js"
import User from "../models/UserModel.js"

export const getAllPosts = asyncHandler(async (req, res) => {
    const page = req.query.p || 0;
    const postPerPage = 10
    const posts = await Post.find().sort('-createdAt').skip(page * postPerPage).limit(postPerPage).populate("postOwner", ["displayName", "email"])
    res.status(200).json(posts)
})
export const createPost = asyncHandler(async (req, res) => {
    const { content, tags, placeName, title, rating } = req.body
    const { id } = req.user
    const post = await Post.create({
        postOwner: id, content, tags, placeName, title, rating
    })
    res.json(post)
})
export const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { userId, type } = req.body
    if (type === "like") {
        const post = await Post.findById(id).populate("postOwner", ["displayName", "email"])
        if (!post) throw new Error("post not found")
        const alreadyLikedIndex = post.likes.findIndex(likeUserId => likeUserId.equals(userId))
        if (alreadyLikedIndex !== -1) {
            post.likes.splice(alreadyLikedIndex, 1);
        } else {
            post.likes.push(userId);
        }
        await post.save();
        return res.status(201).json(post)
    }
})