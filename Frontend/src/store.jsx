
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import taskReducer from "./slices/taskSlice";
import otpReducer from "./slices/otpSlice";

const store = configureStore({

    reducer: {
           
        auth: authReducer,
        task: taskReducer,
        otp: otpReducer,
    }
})

export default store