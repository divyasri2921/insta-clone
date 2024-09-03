import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {axiosInstance} from '../requestMethods'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=>{
    const res = await axiosInstance.get('/users')
    return res.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState:{
        users: [],
        isFetching: false,
        error: false
    },
    reducers:{
        getUsersStart: (state)=>{
            state.users = []
            state.isFetching = true
            state.error= false
        },
        getUsersSuccess: (state, action)=>{
            state.users = action.payload
            state.isFetching = false
            state.error= false
        },
        getUsersFailure: (state)=>{
            state.users = []
            state.isFetching = false
            state.error= true
        },
    },
    extraReducers(builder){
        builder.addCase(fetchUsers.pending, (state)=>{
            state.users = []
            state.isFetching = true
            state.error= false
        })
        builder.addCase(fetchUsers.fulfilled, (state, action)=>{
            state.users = action.payload
            state.isFetching = false
            state.error= false
        })
        builder.addCase(fetchUsers.rejected, (state)=>{
            state.users = []
            state.isFetching = false
            state.error= true
        })
    }
})

export const { getUsersStart, getUsersSuccess, getUsersFailure } = usersSlice.actions 

export default usersSlice.reducer