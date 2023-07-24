import React, { useEffect, useRef, useState } from "react";
import { Welcome, Search, Post } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, reset } from "../features/posts/postSlice";


const Home = () => {
  const { posts, isLoading, isSuccess, isError, message } = useSelector(state => state.post)
  const [Posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(true)
  const isMountedRef = useRef(true)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isMountedRef.current) {
      isMountedRef.current = false
      dispatch(getAllPosts())
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isMountedRef.current) {
      if (isError) console.log(message);
      if (isSuccess) setPosts(posts);
      if (isLoading) { setLoading(true) } else setLoading(false)
      dispatch(reset())
    }
  }, [dispatch, isError, isSuccess, posts, message, isLoading])

  useEffect(() => {
    if (!isMountedRef.current) {
      return () => dispatch(reset())
    }
  }, [dispatch])

  if (isLoading) console.log("loading")
  return (
    <div className="relative top-[75px] container mx-auto px-4 pt-10 ">
      <Search />
      <div className="flex flex-wrap gap-10 mt-10">
        {loading ? <h1 className="text-3xl w-full text-center font-bold text-primary-100">Loading...</h1> : (
          Posts?.map((post, id) => <Post key={id} {...post} setPosts={setPosts} isLoading={isLoading} />)
        )}
      </div>
    </div>
  );
};

export default Home;
