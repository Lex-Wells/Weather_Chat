import React, { useState } from 'react'
import {useSelector } from 'react-redux'
import {useDispatch } from 'react-redux'
import { setPost } from '../features/weatherActions/postSlice';
import axios from 'axios'

const SwitchButtons = () => {
const dispatch = useDispatch()

const {userInfo} = useSelector((state)=>state.auth)
const weather = useSelector((state)=> state.weather.value ) 


const handleClick = async(location)=>{
  const response = await axios.get(`/api/posts/search/${location}`);
  const locationPosts = response.data.posts
 try {
  dispatch(setPost(locationPosts))
 } catch (error) {
  console.log(error);
 }
}

const handleMyPostsClick = async()=>{
  const response = await axios.get(`/api/posts/${userInfo._id}`);
  const myPosts = response.data.posts
 try {
  dispatch(setPost(myPosts))
 } catch (error) {
  console.log(error);
 }

}
  return (
<div className='flex justify-center items-center  '>
    <div className='flex justify-center w-max-w-lg p-3  overflow-hidden rounded-lg shadow-md bg-dark items-center '>
        <h1 className='cursor-pointer text-sm lg:text-md w-1/2 items-center hover:underline '  onClick={handleMyPostsClick}>My Posts</h1>
        {weather.city?<h1 onClick={()=>{handleClick(weather.city)}} className='hover:underline cursor-pointer items-center text-center text-green'>{weather.city}</h1>:
            <h1 className='text-lightgray '>Search For City</h1>
        }
    </div>
</div>
  )
}

export default SwitchButtons