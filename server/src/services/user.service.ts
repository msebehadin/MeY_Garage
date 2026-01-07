

import {prisma} from '../config/db'
import { Role } from '@prisma/client';
import {AppError} from '../utils/AppError'
import { createUserDTO,UpdateUserRoleDTO,userResponseDTO } from '../DTOS/user.dto';

function toUserResponse(user:any):userResponseDTO{
    return{
        id:user.userId,
        name:user.name,
        email:user.email,
        role:user.role,
        createdAt:user.createdAt
    }
}
// create user

export const createUser=async (data:createUserDTO):Promise<userResponseDTO>=>{
    // validation 
    if(!data.name.trim()){
        throw new AppError('Name is required',400)
    }
    // Enum validation before DB
    if(!Object.values(Role).includes(data.role)){
        throw new AppError('invalid role',400)
    }

    const existingUser=await prisma.user.findUnique({
        where:{email:data.email}
    })
    if(existingUser){
        throw new AppError('email already in use',409)
    }
    const user=await prisma.user.create({
  data
    })
    return toUserResponse(user)
}
export const updateUserRole=async (userId:string,data:UpdateUserRoleDTO,actorRole:Role):Promise<userResponseDTO>=>{
if(actorRole!==Role.ADMIN){
    throw new AppError('the role change only by Admin',403)
}
if(!Object.values(Role).includes(data.role)){
    throw new AppError('invalid role',403)
}
const user= await  prisma.user.findUnique({
    where:{id:userId}
})
if(!user){
    throw new AppError('user not found',404)
}
const updateUser=await prisma.user.update({
    where:{id:userId},
    data:{role:data.role}
})
return toUserResponse(updateUser)
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