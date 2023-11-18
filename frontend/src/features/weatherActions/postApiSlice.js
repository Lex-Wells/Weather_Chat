import {apiSlice} from "./apiSlice"
const POST_URL = "/api/posts"



export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({ 
        url: `${POST_URL}/create-post/`,
        method: "POST",
        body: data,
      }), 
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${POST_URL}/${postId}`,
        method: "DELETE",
      }),
    }),
    getPosts: builder.query({
      query: (ID) => ({ 
        url: `${POST_URL}/${ID}`,
        method: "GET",
      }),
    }),
    getPostByLocation: builder.query({
      query: (location) => ({
        url: `${POST_URL}/search/${location}`,
        method: "GET",
      }),
    }),
    likePost: builder.mutation({
      query: (postId,userId)=>({
        url: `${POST_URL}/like/${postId}`,
        body: userId,
        method: "PUT" 
      })
    })
  }),
});


export const { useCreatePostMutation, useGetPostsQuery, useDeletePostMutation , useGetPostByLocationQuery, useLikePostMutation} = postApiSlice


