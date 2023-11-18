import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

const userProtect = asyncHandler(async(req,res,next)=>{
let token
token = req.cookies.jwt
if(token){
try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(tokenDecoded.userId).select("-password")
    next()
} catch (error) {
   res.status(401)
   throw new Error("Not valid token") 
}
}else{
    res.status(401)
    throw new Error("You're not authorized")
}
})

export {userProtect}