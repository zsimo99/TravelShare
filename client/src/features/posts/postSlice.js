import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./postService"

const initialState = {
    posts: null,
    post: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
}

export const getAllPosts = createAsyncThunk("post/getAll", async (page, thunkApi) => {
    try {
        return await authService.getAllPosts(page)
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
            state.posts = null;
            state.post = null;
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
    }
})

export default postSlice.reducer
export const { reset } = postSlice.actions