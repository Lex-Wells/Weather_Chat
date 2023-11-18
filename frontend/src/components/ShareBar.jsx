import React, { useState, useEffect,useRef } from 'react'
import { BsFillImageFill } from 'react-icons/Bs';
import { useSelector} from 'react-redux';
import {useDispatch} from "react-redux"
import { setPost } from '../features/weatherActions/postSlice';
import { toast } from 'react-toastify'
import {useCreatePostMutation,useGetPostsQuery} from "../features/weatherActions/userApiSlice"
import { useGetPostByLocationQuery} from "../features/weatherActions/postApiSlice"



const ShareBar = () => {
  const [text,setText] = useState("")
  const [createPost] = useCreatePostMutation() 
  const dispatch = useDispatch()
  const weather = useSelector((state)=> state.weather.value ) 
  const {userInfo} = useSelector((state)=>state.auth)
  const [selectedImage, setSelectedImage] = useState(null);
  const [iconColor, setIconColor] = useState('black');

  const textInput = useRef()
  const{data: post,refetch} = useGetPostByLocationQuery(weather.city)

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setIconColor("red")


  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  }
}

  const handleSubmit = async(e)=>{
    e.preventDefault()
    refetch()
    setIconColor("black")

    
try {
  if(text && weather){
  const res =  await createPost({
    user: userInfo._id,
    text: text,
    location: weather.city,
    temp: weather.temp,
    feels_like: weather.feels_like,
    weather: weather.weather,
    firstname: userInfo.firstname,
    uploadimg: selectedImage, 
    
  }).unwrap()
  const allPosts = res?.posts
dispatch(setPost(allPosts))
 textInput.current.value = ''

  }
  else{
    toast.error("Search For City & Add Comment", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,   
      theme: "dark", 
      })
  }

} catch (error) {
  toast.error("Search For City & Add Comment", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,   
    theme: "dark", 
    })
    console.log(error);
}


  }


  return (
<div className='p-5 '>  
    <div className=' flex justify-center items-center w-full space-between'>
            
        <div className='flex justify-center w-max-w-lg p-3  overflow-hidden rounded-lg shadow-md bg-dark  '>
   <form onSubmit={handleSubmit}  className=' flex justify-center items-center w-full'> 
           <div className=' m-0 cursor-pointer'>
           <label htmlFor="image-upload" className="custom-file-input">
         <BsFillImageFill 
           size={20}
           color={iconColor}
           />
      </label>
      <input
        type="file"
        id="image-upload"
        accept=".jpeg, .png, .jpg, .gif"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
               
           </div>
              <input 
               className=' rounded-xl w-4/5 bg-light text-base lg:text-base sm:text-sm focus:outline-none m-2'  
               placeholder='How is the weather?'
               onChange={(e)=>{setText(e.target.value)}}
               maxLength={150}
               ref={textInput}
               />
              <div>
            <button type="submit"  className='cursor-pointer'>Share</button>
          </div>
        </form>
   
        </div>
        
    </div>
</div>
  )
}

export default ShareBar