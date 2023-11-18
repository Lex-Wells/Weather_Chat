import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const authUsers = asyncHandler(async(req, res)=>{
 
    const {email, password} = req.body    
    const user = await User.findOne({email})
    
    if(user && await(bcrypt.compare(password, user.password))){
        genToken(res, user._id)
        res.status(201).json({  
            _id: user._id, 
            firstname: user.firstname, 
            lastname: user.lastname, 
            img: user.img,
            posts: user.posts
       
        })
       }
        else{
           res.status(401).json({message: "Wrong email or password"}) 
           throw new Error
    }
       
})



const registerUser = asyncHandler(async(req, res)=>{
    const {email,firstname,lastname,password,img} = req.body
    const duplicateUser = await User.findOne({email})
    if (duplicateUser){
        res.status(400).json({message: "User already exists"})
        throw new Error
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPW = await bcrypt.hash(password,salt)

    const user = await User.create({
        email,
        firstname,
        lastname,
        password:hashedPW,
        img, 
        posts: [] 
    })

   if(user){
    genToken(res, user._id)
    res.status(201).json({
        _id: user._id, 
        firstname: user.firstname, 
        lastname: user.lastname, 
        img: user.img,
        posts: user.posts
    })
   }
    else{
       res.status(400).json({message: "User not creater"}) 
       throw new Error
    }
    
})

const getUserProfile = (req,res)=>{
    const user ={
        id: req.user._id,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email,
    }
    res.status(200).json({user})
}

const logOut = asyncHandler(async(req,res)=>{
res.cookie("jwt"," ",{
    httpOnly:true, 
    expires: new Date(0)
})
res.status(200).json({mess: "You've been logged out"})
})

const genToken = (res,userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "10d"
    })
    res.cookie("jwt",token,{
        httpOnly:true, 
        secure: process.env.NODE_ENV !== 'development', 
        maxAge: 10 * 24 * 60 * 60 * 1000, 
        sameSite: 'strict',
    })

}


const getAllProfiles = async(req,res)=>{
    
    try {
       const user = await User.find()
       res.status(200).json({user})
    } catch (error) {
        res.status(400).json({mess: "Can't get profiles"})
    }
}
  
export{
    authUsers, 
    registerUser, 
    logOut, 
    getUserProfile,
    getAllProfiles
}