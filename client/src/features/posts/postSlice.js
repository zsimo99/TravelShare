import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postService } from "./postService"

const initialState = {
    posts: null,
    post: null,
    isLoading: false,
    LikeLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
}

export const getAllPosts = createAsyncThunk("post/getAll", async (page, thunkApi) => {
    try {
        return await postService.getAllPosts(page)
    } catch (error) {
        console.log(error);
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkApi.rejectWithValue(message);
    }
})

export const addOrRemoveLike = createAsyncThunk("post/like", async (postId, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.data.token
        const userId = thunkApi.getState().auth.user.data.userInfo.id
        return await postService.addOrRemoveLike(postId, userId)
    } catch (error) {
        console.log(error);
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkApi.rejectWithValue(message);
    }
})

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllPosts.fulfilled, (state, actions) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = actions.payload
            })
            .addCase(getAllPosts.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.message = actions.payload
            })
            .addCase(addOrRemoveLike.pending, state => {
                state.LikeLoading = true
            })
            .addCase(addOrRemoveLike.fulfilled, (state, actions) => {
                state.LikeLoading = true
                state.isSuccess = true
                state.posts = state.posts.map(obj => obj._id === actions.payload._id ? actions.payload : obj)
            })
            .addCase(addOrRemoveLike.rejected, (state, actions) => {
                state.LikeLoading = true
                state.isError = true
                state.message = actions.payload
            })
    }
})

export default postSlice.reducer
export const { reset } = postSlice.actions