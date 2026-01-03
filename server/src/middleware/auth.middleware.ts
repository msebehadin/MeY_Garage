import { fromNodeHeaders } from "better-auth/node";
import {auth} from '../config/auth'
export const authorize=(allowedRoles:string[])=>{
    return async (req:any,res:any,next:any)=>{
        // get the session from the headers
        const session=await auth.api.getSession({
headers:fromNodeHeaders(req.headers),
        })
        // check if logged in
        if(!session||!session.user){
            return res.status(401).json({message:'please log in first'});

        }
        // check if their role is allowed

        const userRole=session.user.role;
        if(!allowedRoles.includes(userRole)){
            return res.status(403).json({
                message: `Access denied.Role${userRole} is not authorized`
            })
        }
        // attach user to request for latter use
        req.user=session.user;
        next()
    }
};