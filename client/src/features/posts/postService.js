import axios from "axios"


const url = `${import.meta.env.VITE_URL}/api/post`;



const getAllPosts = async (page) => {
    const res = await axios.get(`${url}${page ? `?p=${page}` : ""}`)
    return res.data
}

export const authService = { getAllPosts }
