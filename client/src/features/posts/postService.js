import axios from "axios"

// const url = "http://localhost:3000/api/post/";
const url = "https://webshare-api-v2.onrender.com/api/post/";


const getAllPosts = async (page) => {
    const res = await axios.get(`${url}${page ? `?p=${page}` : ""}`)
    return res.data
}

export const authService = { getAllPosts }
