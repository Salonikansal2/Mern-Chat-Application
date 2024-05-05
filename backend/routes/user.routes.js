import express from "express"
import protectroute from "../middleware/protectRoute.js";
import {getusersforsidebar} from "../controllers/user.controller.js"
const router = express.Router();

router.get("/",protectroute,getusersforsidebar)


export default router;