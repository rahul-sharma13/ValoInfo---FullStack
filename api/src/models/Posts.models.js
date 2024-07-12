import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    
},{timestamps: true});

const Post = mongoose.model("Post",postSchema);

export default Post;