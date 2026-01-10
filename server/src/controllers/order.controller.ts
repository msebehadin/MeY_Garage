import { Request,Response } from "express";
import * as orderService from '../services/order.service'

import { AppError } from "../utils/AppError";



export const createOrder= async (req:Request,res:Response)=>{
    try {
        const customerId=(req as any).user?.id
        if(!customerId){
            res.status(401).json({
                success:false,
                message:'unauthorized user '
            })
        }
        const {vehicleId}=req.body
        if(!vehicleId){
            res.status(400).json({
                success:false,
                message:'vehicleId is required'

            })
        }
        const newOrder=await orderService.createOrder({
            customerId:Number(customerId),
            vehicleId:Number(vehicleId)
        });

return res.status(201).json({
    succes:true,
    message:'order created succesfully',
    data:newOrder
})
    } catch (error) {
if(error instanceof AppError){
    if(error.message.includes('vehicle not found')){
        return res.status(404).json({
            succes:false,
            message:error.message
        })
    }
}
console.error('error creating order...',error)
return res.status(500).json({
    succes:false,
    message:'failed to create order'
})
    }
}
export const assignOrder=async (req:Request,res:Response)=>{
    try {
        const {orderId,mechanicId}=req.body;
        if(!mechanicId){
            res.status(400).json({
                success:false,
                message:"mechanicId is required"
            })
        }
        const updateOrder=await orderService.assignOrder({
            orderId:Number(orderId),
            mechanicId:String(mechanicId)
        })
        return res.status(200).json({
            succes:true,
            message:'order assigned successfully',
            data:updateOrder
        })

        
    } catch (error) {
if(error instanceof AppError){
    if(error.message.includes('invalid mechanic')){
        return res.status(404).json({
            succes:false,
            message:error.message
        })
    }
}
    }
    console.error('error assigning order:')
}
export const getOrdersForMechanic=async (req:Request,res:Response)=>{
    try {
        const mechanicId=(req as any).user?.id
        if(!mechanicId){
            res.status(401).json({
                success:false,
                message:"unauthorized:user not authenticated"
            })
        }
        const orders=await orderService.getOrdersForMechanic(
            String(mechanicId)
        )
        res.status(200).json({
            success:true,
            message:'order retrieved successfully',
            data:orders

        })
    } catch (error) {
        console.error('error fetching mechanic orders',error)
   return      res.status(400).json({
            success:false,
            message:'faild to retrieve'
           }) 
    }
}