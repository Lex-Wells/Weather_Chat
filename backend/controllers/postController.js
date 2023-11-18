import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import Post from "../models/postModel.js"
import mongoose from "mongoose"



 

const getAllPosts = asyncHandler(async(req,res)=>{
try {
     const posts = await Post.find()
   res.status(200).json({posts})
} catch (error) {
    res.status(400).json(error)
}
  
})
const changeEditing = async(req,res)=>{
  const {editing} = req.body
  const pId = req.params.postId
  try {
    const post = await Post.findByIdAndUpdate(pId, {editing}, { new: true })  
      post.editing = !post.editing
      res.status(200).json({post})
    
  } catch (error) {
    res.status(200).json({message: "Post not changed"})
  }

}


const makePost = async (req, res) => {
    const { user,text, uploadimg,likes, location,feels_like,weather, firstname,editing } = req.body;
    const newPost = new Post({ user,text,uploadimg,likes, location,feels_like,weather, firstname,editing});
    const currentUser = await User.findById(user)
    try {
       const session = await mongoose.startSession()
       session.startTransaction()
       await newPost.save({session})
       currentUser.posts.push(newPost) 
       await currentUser.save({session})
       await session.commitTransaction()
       const user = await User.findById(currentUser).populate("posts")
       const {posts} = user
       res.status(201).json({posts})
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
   

  }

const getUserPost = async (req, res) => {
  const id = req.params.id
 
  try {
    const user = await User.findById(id).populate("posts")
   const {posts} = user
    res.status(200).json({ posts})
  } catch (error) {
    res.status(400).json({Message: "Can't get post"}) 
  }
};


const updatePost = async (req,res)=>{
    const postId = req.params.id
    const {text} = req.body
    try {
        const post = await Post.findByIdAndUpdate(postId, {text}, { new: true })  
         if(!post){res.status(400).json({ Message: "No post" })}
         else{
        res.status(200).json({post})}
    } catch (error) {
        res.status(400).json({ Message: "Could not update post" })  
        
    }
   
}



const deletePost = async (req,res)=>{
  const id = req.params.postId
  const postId = id.trim("\n")
  
  

try {
  const post = await Post.findByIdAndDelete(postId).populate("user");
  if (!post) {
    return res.status(404).json({ Message: "Post not found" });
  } 
  const userId = post.user._id;
  await User.findByIdAndUpdate(
    userId,
    { $pull: { posts: postId } }, 
    { new: true }
  );
  const user = await User.findById(userId).populate("posts")
  const {posts} = user
   res.status(200).json({ posts})
  
} catch (error) {
  res.status(500).json({ Message: "Could not delete post" });
}
}


const getPostByLocation = async(req,res)=>{
const searchLocation= req.params.location
  const location = searchLocation.trim("\n")
  try {
    const posts = await Post.find({ location: { $regex: new RegExp(location, 'i') } });
    res.status(200).json({posts})
  } catch (error) {
    res.status(400).json({Message: "City Cant be found"})
  }
}



const getById = async(req,res)=>{
    const id = req.params.id
 
    try {
      const user = await User.findById(id).populate("posts")
     const {posts} = user
      res.status(200).json({ posts})
    } catch (error) {
      res.status(400).json({Message: "Can't get posty"}) 
    }
}


const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.body.userInfo;  
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likes = post.likes || [];

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    const likes = post.likes.length

    res.status(200).json({likes, userId});
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



export{
makePost,
getAllPosts, 
getUserPost, 
updatePost, 
getById,
deletePost, 
likePost, 
getPostByLocation, 
changeEditing
}