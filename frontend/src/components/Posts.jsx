import React from 'react'
import {AiOutlineHeart} from 'react-icons/Ai';
import {BsSave} from 'react-icons/Bs';
import {RxCircleBackslash} from 'react-icons/Rx';
import {BsFillTrash3Fill} from 'react-icons/Bs'
import {AiFillEdit} from 'react-icons/Ai'
import axios from 'axios'
import {useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import {useDeletePostMutation} from "../features/weatherActions/postApiSlice"
import { likePost } from '../features/weatherActions/postSlice';
import { setPost, setLoading, setError } from '../features/weatherActions/postSlice';
import {setToggleEditing} from "../features/weatherActions/postSlice"
import {setUpdatePost} from "../features/weatherActions/postSlice"
import {useGetPostsQuery} from "../features/weatherActions/userApiSlice"



const Posts = () => {
     const dispatch = useDispatch()
     const [deletePost] =  useDeletePostMutation()
    

     const {userInfo} = useSelector((state)=>state.auth)
    const postState = useSelector((state)=>state.post.value) || []


    const [text, setTextPost] = useState("")


const { data: posts, loading, error } = useGetPostsQuery(userInfo._id);





const handleLikeClick = async (postId,userInfo) => {
  const response = await axios.put(`/api/posts/like/${postId}`, {userInfo})
  const resLike = response.data.likes;

  try {
dispatch(likePost({ postId, resLike}))
  } catch (error) {
    console.error('Error liking/unliking post:', error);
  }
}


useEffect(() => {
  if (error) {
    dispatch(setError(error.message))
    console.error('Error fetching user posts:', error);
  } else {
    dispatch(setLoading())
    const allPosts = posts?.posts
    dispatch(setPost(allPosts))
    
  }
}, [posts, error,dispatch]); 

const postDelete = async(postId)=>{


     if (window.confirm('Are you sure you want to delete this post?')) {
          try {
              const result = await deletePost(postId).unwrap();
              const allPosts = result?.posts
              dispatch(setPost(allPosts))
          } catch (error) {
              console.error('Error deleting post:', error);
          }
      }
}



const editPost = (postId) => {
  dispatch(setToggleEditing(postId))  
  setTextPost("")

};

const savePost = async (postId) => {
  try {
    const response = await axios.put(`/api/posts/updatepost/${postId}`, {text});
    const updatedPost = response.data.post
    dispatch(setToggleEditing(postId)) 
    dispatch(setUpdatePost(updatedPost))
  } catch (error) {
    console.error('Error updating post:', error);
   
  }
 setTextPost("")
};


  return (
 <div className=' w-full flex justify-center items-center  flex-col'>

 
{loading && <p>Loading...</p>}
{error && <p>Error: {error}</p>}

  
{postState? postState.map((post)=><div key={post._id} className="flex flex-col max-w-xs min-w-sm p-6 space-y-6 overflow-hidden rounded-lg shadow-md bg-dark mt-3 mb-3">
	<div className="flex flex-wrap justify-between">
		<div className="flex flex-col space-y-1">
			<a rel="noopener noreferrer" className="text-sm font-semibold" >{post.firstname}</a>
		</div>
    <a rel="noopener noreferrer" className="text-large  font-semibold text-bgmain " >{post.location}</a>
          <div className='cursor-pointer'>
                           { post.user === userInfo._id ?< BsFillTrash3Fill  
                            onMouseOver={({target})=>target.style.color="#ab3630"}
                            onMouseOut={({target})=>target.style.color="gray"}
                            onClick={()=>{postDelete(post._id)}}
                           />:<></>}
                     </div>
	</div>
	<div>
  <div className="relative">
  {post.uploadimg?<img 
   className="object-cover w-80 mb-4 h-60 sm:h-96 "
  src={post.uploadimg}/>
		:<img src="https://source.unsplash.com/random/100x100/?5" alt="" className="object-cover  w-80 mb-4 h-60 sm:h-96 " />}
  
  <div className='bg-darkest bg-opacity-60 absolute  w-full  text-1xl text-white top-0 justify-between '>
    <div className='flex justify-between m-2'>
          <div className="">{post.weather}</div>
          <div className="">{post.feels_like}</div>
      </div>
  </div>
  </div>
  <div >
      {post.editing=== true?  (
        <input
          type="text"
          id={post._id} 
          value={text}
          maxLength="40"
          className="text-left border rounded py-2 px-2 bg-gray-100 border border-black-300 text-gray-900 text-sm rounded-lg h-1/2 w-full" placeholder="Change text"
          onChange={(e) => setTextPost(e.target.value)}
          
        />
      ) : (
        <p className="text-sm text-center" >{post.text}</p>
      )}
   
    </div>
	</div>
	<div className="flex flex-wrap justify-between">
		<div className="space-x-2">
    {post.editing === false && post.user === userInfo._id ? <div onClick={()=>{editPost(post._id)}}  className='cursor-pointer'>   
                         <AiFillEdit/>
                 </div>: <></> }
                {post.editing === true?
       <div  className=' space-x-2 cursor-pointer flex flex-wrap justify-between'>
           <BsSave
            onMouseOver= {({target})=>target.style.color="#1A5D1A"}
            onMouseOut={({target})=>target.style.color="black"}
           onClick={()=>{savePost(post._id)}}
            />
           <RxCircleBackslash 
            onMouseOver={({target})=>target.style.color="#ab3630"}
            onMouseOut={({target})=>target.style.color="black"}
           onClick={()=>{editPost(post._id)}}/>
      </div> :<></>}
		</div>
		<div className="flex space-x-2 text-sm dark:text-gray-400">
			
			<button type="button" className="flex items-center p-1 space-x-1.5">
       { <div onClick={()=>{handleLikeClick(post._id,userInfo._id)}} > 
        <AiOutlineHeart 
          onMouseOver= {({target})=>target.style.color="#FF6969"}
          onMouseOut={({target})=>target.style.color="black"}
        size={20}/>
        </div>}
				{post.likes.length > 0 ?<span>{post.likes.length}</span>: <>{post.likes}</>}
			</button>
		</div>
	</div>
</div>):<>Loading</>}


{postState ==""? <>
<div  className="flex flex-col max-w-xs min-w-sm p-6 space-y-6 overflow-hidden rounded-lg shadow-md bg-dark mt-3 mb-3">
	<div className="flex flex-wrap justify-between">
		<div className="flex flex-col space-y-1">
			<a rel="noopener noreferrer" className="text-sm font-semibold ">{userInfo.firstname}</a>
		</div>
    <a rel="noopener noreferrer" className="text-large  font-semibold text-bgmain" >Search Location</a>
          <div className='cursor-pointer'>
                           < BsFillTrash3Fill 
                           />
                     </div>
	</div>
	<div>
  <img src="https://source.unsplash.com/random/100x100/?5" alt="" className="object-cover  w-80 mb-4 h-60 sm:h-96 " />
	
     	<p className="text-sm text-center" >Make a Post & Share Now!</p>
	</div>
	<div className="flex flex-wrap justify-between">
		<div className="space-x-2">
                  <div  className='cursor-pointer'> 
                         <AiFillEdit/>
                 </div> 
		</div>
		<div className="flex space-x-2 text-sm dark:text-gray-400">
			
			<button type="button" className="flex items-center p-1 space-x-1.5">
      <AiOutlineHeart 
          onMouseOver= {({target})=>target.style.color="#FF6969"}
          onMouseOut={({target})=>target.style.color="black"}
        size={20}/>
				<span>100</span>
			</button>
		</div>
	</div>
</div>
</>:<></>}



</div> 



  )
}

export default Posts