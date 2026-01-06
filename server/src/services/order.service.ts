import { prisma } from "../config/db";
import { Order, OrderStatus } from "@prisma/client";
interface createOrderInput{
    
    customerId:number;
    vehicleId:number;
}
interface AssignOrderInput{
    orderId:number;
    mechanicId:string;
}
export const createOrder = async (data: createOrderInput):Promise<Order> => {
    const vehicle=await prisma.vehicle.findFirst({
        where:{
            id:data.vehicleId,
            customerId:data.customerId
        }
    })
  if (!vehicle) {
    throw new Error("Vehicle not found or does not belong to this customer");
  }
  return prisma.order.create({
    data: {
      orderHash: crypto.randomUUID(),
      customerId: data.customerId,
      vehicleId: data.vehicleId,
      status: OrderStatus.PENDING,
    },
  });
};

export const assignOrder = async ({ orderId, mechanicId }:AssignOrderInput):Promise<Order> => {
  const mechanic = await prisma.user.findUnique({
    where: { id: mechanicId },
  });
  if (!mechanic || mechanic.role !== "MECHANIC") {
    throw new Error("invalid mechanic");
  }
  return prisma.order.update({
    where: { id: orderId },
    data: {
      assignedToId: mechanicId,
      status: OrderStatus.IN_PROGRESS,
    },
  });
};
export const getOrdersForMechanic = async (mechanicId:string):Promise<Order[]> => {
  return prisma.order.findMany({
    where: { assignedToId: mechanicId },
    include: { vehicle: true, customer: true },
  });
};
