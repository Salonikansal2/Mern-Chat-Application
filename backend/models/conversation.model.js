import mongoose from "mongoose";


const conversationscshema =new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message",
        default:[]
    }]
},{timestamps: true})

const Conversations = mongoose.model("Conversations",conversationscshema);
 export default Conversations;






