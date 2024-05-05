import User from "../models/user.models.js"



export const getusersforsidebar = async(req,res) =>{
    try {

        const loggedinuserid = req.user._id;

        const filteredusers = await User.find({ _id:{
            $ne:loggedinuserid
        }
    }).select("-password")


res.status(200).json(filteredusers)






        
    } catch (error) {
        console.log("error in getusersforsidebar",error.message)
        res.status(500).json({error:"internal error"})
        
    }
}