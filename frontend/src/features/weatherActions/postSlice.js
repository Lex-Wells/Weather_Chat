import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value:[],
    loading: false,
    error: null,
} 

const postSlice = createSlice({  
    name: "post",
    initialState,   
    reducers:{
        setPost: (state, action) => {
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
        clearPost:(state)=>{
            state.value = ""
        },
        likePost: (state, action) => {
          const { postId, resLike } = action.payload;
          return {
            ...state,
            value: state.value.map((post) =>
              post._id === postId ? { ...post, likes: resLike } : post
            ),
          };
            }, 
      unlikePost: (state, action) => {
      const postId = action.payload;
      const post = state.value.find((p) => p._id === postId);
      if (post && post.likes > 0) {
        post.likes -= 1;
      }}, 
            setToggleEditing: (state, action) => {
              const postId = action.payload
              const post = state.value.find((p) => p._id === postId);
              if (post) {
                post.editing = !post.editing;
              }
            }, 
            setUpdatePost: (state, action) => {
              const updatedPost = action.payload;
          
              const updatedState = state.value.map((post) =>
                post._id === updatedPost._id ? updatedPost : post
              );
            
              return {
                ...state,
                value: updatedState,
              };
            },
            deleteSetPost: (state, action) => {
              console.log('Current state:', state);
              console.log('Action Payload:', action.payload);
              const postId = action.payload;
              const myId = state.value.res.posts[0]
            
      state.value = state.value.res.posts.filter((post) => post._id !== postId);
     
            },
    },


})
export const { setPost,  clearPost, likePost, unlikePost,deleteSetPost ,setLoading, setError, setToggleEditing, setUpdatePost} = postSlice.actions

export default  postSlice.reducer
