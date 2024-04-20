import jwt from 'jsonwebtoken';


const generatetokensandsetcookies = (userId ,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn : '30d'})
    

    res.cookie("jwt",token,{
        maxAge : 15 *24 * 60 * 60 * 1000,
        httpOnly: true,
       
        sameSite: 'strict'
    })
}

export default generatetokensandsetcookies;







