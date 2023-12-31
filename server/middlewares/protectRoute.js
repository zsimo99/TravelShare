import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"

export const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.id).select("displayName _id email")
            next()
        } catch (error) {
            res.status(401)
            throw new Error("not authorized")
        }
    }
    if (!token) {
        res.status(401)
        throw new Error("not authorized")
    }
})