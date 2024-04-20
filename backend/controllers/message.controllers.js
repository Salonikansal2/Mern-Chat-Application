import Conversations from "../models/conversation.model.js"
import messages from "../models/message.model.js"



export const sendmessage =async(req,res) =>{
    
try {
    
  const {message} = req.body
  const {id:receiverid} = req.params
  const senderid  = req.user._id

    let conversation= await Conversation.findOne({
    participants: {$all : [senderid,receiverid]}
})
if(!conversation){
    conversation = await Conversations.create({
    participants: [senderid,receiverid]
    })
   
}


const newmessage = new messages({
    senderid,
    receiverid,
    message
})

if(newmessage){
    conversation.messages.push(newmessage._id)
}


await Promise.all([conversation.save(),newmessage.save()])

res.status(200).json(newmessage)




    
} catch (error) {
    console.log("error in sendmessage control",error.message);
    res.status(400).json({error:"internal error"})

    
}







}



export const getmessage =async(req,res) =>{
    try {

    const {id: usertochatid} = req.params;
const senderid = req.user._id;
const conversation = await Conversation.findOne({
    participants: {$all : [senderid,usertochatid]}
}).populate("messages");
if (!conversation){
    return res.status(400).json({error:"no conversation found"})
}
const messages= conversation.messages;
res.status(200).json(messages)





        
    } catch (error) {
        console.log("error in getmessage control",error.message);
        res.status(500).json({error:"internal error"})
        
    }
}






