import {Request,Response,NextFunction} from 'express'
import {Role} from '@prisma/client'
import { auth } from '../config/auth'
export function requireRole(roles:string[]){
return async (req:Request,res:Response,next:NextFunction)=>{
    // validate session using better auth
    const session=await auth.api.getSession({req});
    if(!session){
return res.status(401).json({message:'not authenticated'})
    }
    if(!roles.includes(session.user.role)){
        return res.status(403).json({message:'forbidden'})
    }
    // attach session to request for later use 
    (req as any).user=session.user
    next()
}
}