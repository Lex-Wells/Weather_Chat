import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({baseUrl:""})

export const apiSlice = createApi({
    baseQuery,
    tagTypes:["User"],
    endpoints:(builder)=>({    
    }) 
})   
  
export const PostSliceRoute = createApi({ 
    baseQuery,
    tagTypes:["Post"],
    endpoints:(builder)=>({   
    })
})