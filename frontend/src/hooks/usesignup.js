import React, { useState } from 'react'
import toast from "react-hot-toast"


const usesignup = () => {
 const [loading,setLoading] = useState(false)

const signup = async({fullname ,username,password,confirmpassword,gender}) =>{
    const success = handleInputErrors({fullname ,username,password,confirmpassword,gender})

    if(!success) return;
    setLoading(true);
    try {
        const res = await fetch("/api/auth/signup" ,{
        method: "POST",
        headers:  {"Content-Type": "application/json"},
        
        body: JSON.stringify({fullname ,username,password,confirmpassword,gender})})

        const data = await res.json();
        console.log(data);
        
    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false);
    }


}

return {loading,signup}
}

export default usesignup;

function handleInputErrors({fullname ,username,password,confirmpassword,gender}){
    if(!fullname || !username || !password || !confirmpassword || !gender) 
    
    {toast.error("please fill all fields");
    return false;}


if(password != confirmpassword){
    toast.error("passwords do not match");
    return false;
}
if(password.length < 7){
    toast.error("password must be atleast 7 characters");
    return false;
}

return true;


}