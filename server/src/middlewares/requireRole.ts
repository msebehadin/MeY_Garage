import {Request,Response,NextFunction} from 'express'
import {Role} from '@prisma/client'
import { auth } from '../config/auth'
export const requiredRole=(...allowedRoles:string[])=>async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const session=await auth.api.getSession({req});
         if (!session || !session.user) {
        return res.status(401).json({
          message: "Unauthorized: Please log in",
        });
      }
      const userRole=session.user.role;
         if (!userRole || !allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: "Forbidden: Insufficient permissions",
        });
      }