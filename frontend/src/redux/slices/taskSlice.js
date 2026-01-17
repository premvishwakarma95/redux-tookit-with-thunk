import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosInstance";


export const getTasks = createAsyncThunk("/task/",async() => {
    try {
        const res = axiosInstance.get("/task/");
        toast.promise(res,{
            loading:"Wait !! loading your tasks",
            success:(data) => {
                return data?.data?.message;
            },
            error:"Failed to load tasks"
        })
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const createTask = createAsyncThunk("/task/",async(data) => {
    try {
        const res = axiosInstance.post("/task/",data);
        toast.promise(res,{
            loading:"Wait !! while creating your task",
            success:(data) => {
                console.log("datacreate",data);
                
                return data?.data?.message;
            },
            error:"Failed to create task"
        })
        return (await res).data;
    } catch (error) {
        console.log("craete",error);
        toast.error(error?.response?.data?.message);
    }
})

export const deleteTask = createAsyncThunk("/task/taskId",async(taskId) => {
    try {
        const res = axiosInstance.delete(`/task/${taskId}`);
        toast.promise(res,{
            loading:"Wait !! while deleting your task",
            success:(data) => {
                return data?.data?.message;
            },
            error:"Failed to delete task"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getTaskDetails = createAsyncThunk("/task/taskId",async(taskId) => {
    try {
        const res = axiosInstance.get(`/task/${taskId}`);
        toast.promise(res,{
            loading:"Wait !! while getting your task details",
            success:(data) => {
                return data?.data?.message;
            },
            error:"Failed to get task detail"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const updateTaskDetails = createAsyncThunk('/task/Id',async(data) => {
    try {
        const {id,task} = data;
        
       const response = axiosInstance.put(`/task/${id}`,task);
       toast.promise(response,{
        loading:"Wait !! while updating your task",
        success:(data) => {
            return data?.data?.message;
        },
        error:"Failed to update task"
    })
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const updateTaskStatus = createAsyncThunk('/task/Id',async({id,status}) => {
    try {
       const response = axiosInstance.post(`/task/status/${id}`,{status:status});

       toast.promise(response,{
        loading:"Wait !! while updating your task status",
        success:(data) => {
            return data?.data?.message;
        },
        error:"Failed to update task status"
    })
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const taskSlice = createSlice({
    name:"task",
    initialState:{
        tasks: localStorage.getItem("tasks") == 'undefined' ? {} : JSON.parse(localStorage.getItem("tasks")),
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getTasks.fulfilled,(state,action) => {
            localStorage.setItem("tasks",JSON.stringify(action?.payload?.tasks));
            state.tasks = JSON.parse(JSON.stringify(action?.payload?.tasks));
        })
        
    }
})


export default taskSlice.reducer;