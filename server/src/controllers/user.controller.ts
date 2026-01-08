import { Request, Response } from "express";
import * as UserService from "../services/user.service";
import { Role } from "@prisma/client";
import { AppError } from "../utils/AppError";
import { success } from "zod";






export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.getUsers();
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(500).json({success:false,message:"faild to fetch user"})
      }
    };
    export const updateuserRole=async (req:Request,res:Response)=>{
        try {
            const {id}=req.params
            const {role}=req.body
            if(!id||!role){
     return     res.status(400).json({success:false,message:'both id and role are required'})
          }
        //   if(! Object.values(Role).includes(role)){
        //     return res.status(400).json({
        //         success:false,
        //         message:'invalid role value'
        //     })
            const actorRole=(req as any).user?.role;
            if(!actorRole){
                return res.status(401).json({
                    success:false,
                    message:'unauthorized:user not authenticated'
    
                })
            }
            
    const updateUSer=await UserService.updateUserRole(id,{role},actorRole);
    res.status(200).json({
        success:true,
        message:'user role update successfully',
        data:updateUSer
    }) 
    } catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message
            })
        }
        console.error('un')
    }
}
