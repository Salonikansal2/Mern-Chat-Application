import bcrypt from 'bcryptjs';

import User from '../models/user.models.js';
import generatetokensandsetcookies from '../utils/generatetoken.js';

export const signup =async (req, res) => {

   try {

    const {fullName , username, password ,confirmpassword , gender, profilepicture } = req.body;

    if(password !== confirmpassword) {
        return res.status(400).json({error:"passwords do not match"})
    }   
     const user = await User.findOne({username})

    if(user){
    return res.status(400).json({error:"user already exists"})

    }

// hash passsword here
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);





//
const profilepictureboy = `https://avatar.iran.liara.run/public/boy?username=${username}` 

  const  profilepicturegirl = `https://avatar.iran.liara.run/public/girl?username=${username}}`
  const newUser = new User({
    fullName,
    username,
    password: hashedPassword,
    gender,
    profilepicture : gender === 'male' ? profilepictureboy : profilepicturegirl,
  })


  if(newUser){


//generate jwt token here

    generatetokensandsetcookies(newUser._id,res)


    await newUser.save();
  res.status(201).json({
    _id : newUser._id,
    fullName : newUser.fullName,
    username : newUser.username,
    profilepicture : newUser.profilepicture
  })
  }else{
    res.status(400).json({error:"internal error"})
  }
  
 

   }catch(e) {
    console.log("error in signupForm",e.message)
    res.status(500).json({error:"internal error"})
   }
}




export const login = async(req, res) => {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({username});
      const iscorrectpassword = await bcrypt.compare(password,user?.password || "");

      if(!user || !iscorrectpassword){
        return res.status(400).json({error:"username or password is incorrect"})
      }

      generatetokensandsetcookies(user._id,res)

      res.status(200).json({
        _id : user._id,
        fullName : user.fullName,
        username : user.username,
        profilepicture : user.profilepicture
      })

     
      
    } catch(e) {
      console.log("error in loginForm",e.message)
      res.status(500).json({error:"internal error"})
      
    }
}

export const logout = (req, res) => {
  try {


        res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"successfully logged out"})
    
  } catch(e) {
    console.log("error in logoutForm",e.message)
    res.status(500).json({error:"internal error"})
    
  }
    
}