

import {prisma} from '../config/db'
import { Role } from '@prisma/client';
interface UserData{
    id:string;
    name:string;
    email:string;
    role:Role;
}
export const createUser=async (data:UserData)=>{
    const user=await prisma.user.create({
        data:{
            name:data.name,
            email:data.email,
            role:data.role,
        }
    })
    return user
}
export const updateUserRole=async (userId:string,data:UserData)=>{

    const newUser=await prisma.user.update({
        where:{id:userId},
        data:{
          
            role:data.role
        }
    })
    return newUser
}
export const getUsers=async ()=>{
    return prisma.user.findMany({
select:{
    id:true,
    name:true,
    email:true,
    role:true,
    createdAt:true
}
    })
}
export const getUserById=async(userId:string)=>{
    const user=await prisma.user.findUnique({
        where:{id:userId}
    })
    if(!user){
        throw new Error('user not found')
    }
return user
}