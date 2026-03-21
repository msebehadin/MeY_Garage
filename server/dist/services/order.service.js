"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersForMechanic = exports.assignOrder = exports.createOrder = void 0;
const db_1 = require("../config/db");
const client_1 = require("@prisma/client");
const createOrder = async (data) => {
    const vehicle = await db_1.prisma.vehicle.findFirst({
        where: {
            id: data.vehicleId,
            customerId: data.customerId
        }
    });
    if (!vehicle) {
        throw new Error("Vehicle not found or does not belong to this customer");
    }
    return db_1.prisma.order.create({
        data: {
            orderHash: crypto.randomUUID(),
            customerId: data.customerId,
            vehicleId: data.vehicleId,
            status: client_1.OrderStatus.PENDING,
        },
    });
};
exports.createOrder = createOrder;
const assignOrder = async ({ orderId, mechanicId }) => {
    const mechanic = await db_1.prisma.user.findUnique({
        where: { id: mechanicId },
    });
    if (!mechanic || mechanic.role !== "MECHANIC") {
        throw new Error("invalid mechanic");
    }
    return db_1.prisma.order.update({
        where: { id: orderId },
        data: {
            assignedToId: mechanicId,
            status: client_1.OrderStatus.IN_PROGRESS,
        },
    });
};
exports.assignOrder = assignOrder;
const getOrdersForMechanic = async (mechanicId) => {
    return db_1.prisma.order.findMany({
        where: { assignedToId: mechanicId },
        include: { vehicle: true, customer: true },
    });
};
exports.getOrdersForMechanic = getOrdersForMechanic;
