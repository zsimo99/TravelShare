import React, { useEffect, useState } from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"
import { AiOutlineLike, AiFillHeart } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'


const Post = ({ _id, postOwner: { displayName }, placeName, title, rating, content, tags, likes, comments }) => {
    const navigate = useNavigate()
    const [stars, setStars] = useState({
        FaStar: 0, FaStarHalfAlt: 0, FaRegStar: 0,
    })
    const [Likes, setLikes] = useState(0)
    const getRating = (rating) => {
        let value = rating
        let FaStar = 0
        let FaStarHalfAlt = 0
        let FaRegStar = 0
        FaRegStar = Math.trunc((10 - value) / 2)
        while (value > 2) {
            value -= 2
            FaStar++
        }
        if (value === 1) FaStarHalfAlt++
        setStars({ FaStar, FaStarHalfAlt, FaRegStar })
    }

    useEffect(() => {
        getRating(rating)
        setLikes(likes.length)
    }, [likes, rating])
    return (
        <div className='basis-[400px] flex-1 shadow-2xl bg-gray-200 h-[300px] rounded-lg overflow-hidden' >
            <div className="flex flex-1 h-full">
                <div className='basis-1/3 sm:basis-1/2'>
                    <img className='h-full object-cover ' src="https://cdn.hswstatic.com/gif/s1/mq_travel/gettyimages-1089728672-scaled.jpg" alt="" />
                </div>
                <div className='flex-1 p-4'>
                    <h1 className='text-xl sm:text-2xl font-mono tracking-[-2px]'>{title}</h1>
                    <h3 className='text-secondary-100 text-lg sm:text-xl font-semibold text-end capitalize '>{placeName}</h3>
                    <p className='mt-5 text-xs sm:text-sm font-semibold text-primary-100 capitalize'>{content.split("").length > 100 ? `${content.split("").slice(0, 80).join("")}...` : content}</p>
                    <div className='flex gap-2 mt-3'>
                        {tags.map((tag, i) => <span className='text-xs sm:text-sm py-0.5 px-2 bg-gray-400 block rounded-full text-white' key={i}>#{tag}</span>)}
                    </div>
                    <div className='flex mt-5'>
                        <div className='basis-1/2 flex flex-col justify-between'>
                            <p className='text-sm text-[#555] font-bold flex'>@{displayName}</p>
                            <p className='text-sm text-[#555] font-bold flex'>show more</p>
                        </div>
                        <div className='basis-1/2'>
                            <div className='flex mt-2 text-[#FDCE15] justify-end'>
                                {Array.from({ length: stars.FaStar }, (_, index) => (
                                    <FaStar key={index} />
                                )
                                )}
                                {Array.from({ length: stars.FaStarHalfAlt }, (_, index) => (
                                    <FaStarHalfAlt key={index} />
                                ))}
                                {Array.from({ length: stars.FaRegStar }, (_, index) => (
                                    <FaRegStar key={index} />
                                ))}
                            </div>
                            <div className='text-primary-300 text-[40px] mt-4 flex justify-end cursor-pointer items-center hover:text-[red] '>
                                <div className='relative'>
                                    <span className='mr-1 text-white font-bold text-[10px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>{Likes}</span>
                                    <div className=' rounded-full '><AiFillHeart /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post