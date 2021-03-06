import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import profileReducer from '../features/profile/profileSlice'
import educationReducer from '../features/education/educationSlice'
import aboutReducer from '../features/about/aboutSlice'
export const store=configureStore({
    reducer:{
        auth:authReducer,
        profile:profileReducer,
        education:educationReducer,
        about:aboutReducer,
    },
})