
import mongoose from "mongoose";
 
const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text:{
        type: String, 
        required: true
    }, 
    firstname:{
        type: String
    },
    uploadimg:{
       
        type: String
    }, 
    likes: { 
        type: Array, 
        default: []
    },  
    weather:{
        type: String
    },  
    temp:{
        type: String
    },
    feels_like:{
        type: String
    },
    location:{
        type:String
    },
    time:{
        type:String
    }, 
    editing:{
        type: Boolean, 
        default : false
    }
}, {
    timestamps: true 
})

const Post = mongoose.model("Post", postSchema)
export default Post