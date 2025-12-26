import { Router } from "express";
import { auth } from "../config/auth";
export const authRoute=Router();
authRoute.all('/',async(req,res)=>{
    await auth.handler(req,_res);
})