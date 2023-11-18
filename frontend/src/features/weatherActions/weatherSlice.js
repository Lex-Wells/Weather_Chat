import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:{
    city : "",
    temp: "",
    feels_like: "",
    weather:""
    }
}

export const weatherSlice = createSlice({
    name: "weather", 
    initialState, 
    reducers:{
        getWeather: (state,action)=>{
            state.value = action.payload
            
        }, 
        resetWeather:(state)=>{
            state.value = []
        }
    }
})

export const {getWeather, resetWeather} = weatherSlice.actions

export default weatherSlice.reducer