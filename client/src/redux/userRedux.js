import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {axiosInstance} from '../requestMethods'

export const userLogin = createAsyncThunk('users/userLogin', async (user)=>{
    const res = await axiosInstance.post('/auth/login', user)
    return res.data
})

const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: null,
        isFetching: false,
        error: false
    },
    reducers:{
        loginStart: (state)=>{
            state.user = null
            state.isFetching = true
            state.error= false
        },
        loginSuccess: (state, action)=>{
            state.user = action.payload
            state.isFetching = false
            state.error= false
        },
        loginFailure: (state)=>{
            state.user = null
            state.isFetching = false
            state.error= true
        },
        logout:(state)=>{
            state.user = null
            state.isFetching = false
            state.error= false
        }
    },
    extraReducers(builder){
        builder.addCase(userLogin.pending, (state)=>{
            state.user = null
            state.isFetching = true
            state.error= false
        })
        builder.addCase(userLogin.fulfilled, (state, action)=>{
            state.user = action.payload
            state.isFetching = false
            state.error= false
        })
        builder.addCase(userLogin.rejected, (state)=>{
            state.user = null
            state.isFetching = false
            state.error= true
        })
    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions 

export default userSlice.reducer