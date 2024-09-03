import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {axiosInstance} from '../requestMethods'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
    const res = await axiosInstance.get('/posts/?new=true')
    return res.data
})

const postsSlice = createSlice({
    name: 'posts',
    initialState:{
        posts: [],
        isFetching: false,
        error: false
    },
    reducers:{
        getPostsStart: (state)=>{
            state.posts = []
            state.isFetching = true
            state.error= false
        },
        getPostsSuccess: (state, action)=>{
            state.posts = action.payload
            state.isFetching = false
            state.error= false
        },
        getPostsFailure: (state)=>{
            state.posts = []
            state.isFetching = false
            state.error= true
        },
        
    },
    extraReducers(builder){
        builder.addCase(fetchPosts.pending, (state)=>{
            state.posts = []
            state.isFetching = true
            state.error= false
        })
        builder.addCase(fetchPosts.fulfilled, (state, action)=>{
            state.posts = action.payload
            state.isFetching = false
            state.error= false
        })
        builder.addCase(fetchPosts.rejected, (state)=>{
            state.posts = []
            state.isFetching = false
            state.error= true
        })
    }
})

export const { getPostsStart, getPostsSuccess, getPostsFailure } = postsSlice.actions 

export default postsSlice.reducer