import {Role} from '@prisma/client'
export interface createUserDTO{
    name:string;
    email:string;
    role:Role
}
export interface UpdateUserRoleDTO{
    role:Role
}
export interface userResponseDTO{
    id:string
    name:string
    email:string
    role:Role
    createdAt:Date
}