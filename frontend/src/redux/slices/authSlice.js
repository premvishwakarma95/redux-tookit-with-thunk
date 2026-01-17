import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosInstance";


export const register = createAsyncThunk("/user/register",async(data) => {
    try {
        const response = axiosInstance.post("user/register",data);
        toast.promise(response,{
            loading:"Wait !! creating your account",
            success:(data) => {
                return data?.data?.message;
            },
            error:"Failed to create account"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/user/login",async(data) => {
    try {
        const response = axiosInstance.post("user/login",data);
        toast.promise(response, {
            loading: 'Wait while we validate...',
            success: (data) => {
              console.log('Login successful:', data);
              return data?.data?.message || 'Login successful';
            },
            error: 'Failed to login. Please check your credentials.'
          });
        return (await response).data
    } catch (error) {
        console.log('error',error);
        toast.error(error?.response?.data?.message);
        
    }
})

export const logout = createAsyncThunk("/user/logout",async() => {
    try {
        const response = axiosInstance.get("/user/logout");
        toast.promise(response,{
            loading:"wait !! while logged out",
            success:(data) => {
                return data?.data?.message;
            },
            error:"Failed to logout"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const updateUser = createAsyncThunk("/user/updateProfile",async(data) => {
    try {
        const response = axiosInstance.put(`/user/update`,data);
        toast.promise(response,{
            loading:"wait !! while updating your profile",
            success:(data) => {
                return data?.data?.message;
            },
            error:"Failed to update profile"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
        data: localStorage.getItem("data") == 'undefined' ? {} : JSON.parse(localStorage.getItem("data")),
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(register.fulfilled,(state,action) => {
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
           
            state.isLoggedIn = true,
            state.data = JSON.parse(JSON.stringify(action?.payload?.user));
        })
        .addCase(login.fulfilled,(state,action) => {
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
           
            state.isLoggedIn = true,
            state.data = JSON.parse(JSON.stringify(action?.payload?.user));
        })
        .addCase(logout.fulfilled,(state,action) => {
            state.data = {};
            state.isLoggedIn = false,
            state.role = ""
            localStorage.clear();
        })
        .addCase(updateUser.fulfilled,(state,action) => {
            const updatedUser = action?.payload?.user;
        if (updatedUser) {
          localStorage.setItem("data", JSON.stringify(updatedUser));
          state.data = updatedUser;
        }
        })
        
    }
})


export default authSlice.reducer;