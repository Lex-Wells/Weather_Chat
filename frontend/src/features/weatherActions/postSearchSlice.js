import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value:[],
    loading: false,
    error: null,
} 


const searchPostSlice = createSlice({  
    name: "searchPost",
    initialState,   
    reducers:{
        setSearchPost: (state, action) => {
          state.value = action.payload
          state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
        clearSearchPost:(state)=>{
            state.value = ""
        },
      
    }
})
export const { setSearchPost,  clearSearchPost ,setLoading, setError } = searchPostSlice.actions

export default  searchPostSlice.reducer
