import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import taskReducer from "../redux/slices/taskSlice";

const appStore = configureStore({
    reducer:{
        auth:authReducer,
        task:taskReducer
    },
    devTools:true
})

export default appStore;