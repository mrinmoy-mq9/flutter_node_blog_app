import mongoose from "mongoose";

const post = mongoose.Schema({
    header:{
        type:String,
        required: true
    },
    title:{type:String , required:true},
    desc:{type:String },
    photo:{type:String ,default:""}
},
);


const Post = mongoose.model('Post',post);

export default Post;