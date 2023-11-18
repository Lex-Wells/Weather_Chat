import mongoose from  "mongoose"

const userSchema = new mongoose.Schema({
    firstname:{
        type: String, 
        required: true
    },
    lastname:{
        type: String, 
        required: true
    },
    email:{
        type: String, 
        required: true, 
        unique: true
    },
    password:{
        type: String, 
        required: true
    },
    img:{
        type: String
    },  
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
},{
    timestamps: true
})

const User = mongoose.model("User", userSchema);
// const User = mongoose.model("User", userSchema)
export default User 