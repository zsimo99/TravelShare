import axios from "axios"


const url = `${import.meta.env.VITE_URL}/api/post`;



const getAllPosts = async (page) => {
    const res = await axios.get(`${url}${page ? `?p=${page}` : ""}`)
    return res.data
}
const addOrRemoveLike = async (postId, userId) => {
    console.log("test1")
    const res = await axios.patch(`${url}/${postId}`, { type: "like", userId })
    console.log("test2")
    console.log(res.data)
    return res.data
}

export const postService = { getAllPosts, addOrRemoveLike }
