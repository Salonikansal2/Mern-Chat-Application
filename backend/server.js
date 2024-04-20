import express from "express";
const app = express()
import dotenv from "dotenv";
dotenv.config()

import enterroutes from "./routes/auth.routes.js";
import connectToMong from "./db/connectToMongodb.js";
import messageroutes from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import userroutes from "./routes/user.routes.js";



const PORT = process.env.PORT || 5000  
app.use(express.json());
app.use(cookieParser());




app.use("/api/auth",enterroutes)
app.use("/api/message",messageroutes)
app.use("/api/users",userroutes)











// app.get("/" ,(req,res) => {
//     res.send("hello saloni")
// })


app.listen(PORT,() => {
    connectToMong();
    console.log(`running on the port ${PORT}`)
})