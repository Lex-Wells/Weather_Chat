import {apiSlice} from "./apiSlice"
const USERS_URL = '/api/users'
const POSTS_URL = '/api/posts'



export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/authen/`, 
                method: "POST", 
                body: data
            }) 
        }), 
        logout: builder.mutation({
            query:()=>({
                url: `${USERS_URL}/logout`, 
                method: "POST"
            })
        }),
        register: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/register/`, 
                method: "POST", 
                body: data
            })
        }), 
        createPost: builder.mutation({
            query: (data) => ({
              url: `${POSTS_URL}/create-post/`,
              method: "POST",
              body: data,
            }), 
          }),
          getPosts: builder.query({
            query: (userId) => ({
              url: `${POSTS_URL}/${userId}`,
              method: "GET",
            }),
          }),
    })
})   


export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useCreatePostMutation,useGetPostsQuery} = userApiSlice