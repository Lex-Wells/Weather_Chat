import {configureStore} from "@reduxjs/toolkit"
import weatherReducer from "../features/weatherActions/weatherSlice"
import authReducer from "../features/weatherActions/authSlice"
import searchPostReducer from "../features/weatherActions/postSearchSlice"
import {apiSlice} from "../features/weatherActions/apiSlice"
import postReducer from "../features/weatherActions/postSlice"

export const store = configureStore({
    reducer:{
        weather: weatherReducer,
        auth: authReducer, 
         post: postReducer,
         searchPost: searchPostReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=> 
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})