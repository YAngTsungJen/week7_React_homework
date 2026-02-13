import { configureStore } from "@reduxjs/toolkit";
import messageReducer from '../src/slices/ToastSlice'

export const store = configureStore({
    reducer:{
        message: messageReducer
    }
})

export default store;