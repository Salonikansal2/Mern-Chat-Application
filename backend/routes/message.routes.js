import express from 'express';
import {sendmessage ,getmessage} from "../controllers/message.controllers.js"
import protectRoute from '../middleware/protectRoute.js';


const router = express.Router();


router.get("/:id",protectRoute,getmessage)

router.post("/send/:id",protectRoute,sendmessage)

export default router;



