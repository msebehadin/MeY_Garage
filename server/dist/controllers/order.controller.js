"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersForMechanic = exports.assignOrder = exports.createOrder = void 0;
const orderService = __importStar(require("../services/order.service"));
const AppError_1 = require("../utils/AppError");
const createOrder = async (req, res) => {
    try {
        const customerId = req.user?.id;
        if (!customerId) {
            res.status(401).json({
                success: false,
                message: 'unauthorized user '
            });
        }
        const { vehicleId } = req.body;
        if (!vehicleId) {
            res.status(400).json({
                success: false,
                message: 'vehicleId is required'
            });
        }
        const newOrder = await orderService.createOrder({
            customerId: Number(customerId),
            vehicleId: Number(vehicleId)
        });
        return res.status(201).json({
            succes: true,
            message: 'order created succesfully',
            data: newOrder
        });
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            if (error.message.includes('vehicle not found')) {
                return res.status(404).json({
                    succes: false,
                    message: error.message
                });
            }
        }
        console.error('error creating order...', error);
        return res.status(500).json({
            succes: false,
            message: 'failed to create order'
        });
    }
};
exports.createOrder = createOrder;
const assignOrder = async (req, res) => {
    try {
        const { orderId, mechanicId } = req.body;
        if (!mechanicId) {
            res.status(400).json({
                success: false,
                message: "mechanicId is required"
            });
        }
        const updateOrder = await orderService.assignOrder({
            orderId: Number(orderId),
            mechanicId: String(mechanicId)
        });
        return res.status(200).json({
            succes: true,
            message: 'order assigned successfully',
            data: updateOrder
        });
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            if (error.message.includes('invalid mechanic')) {
                return res.status(404).json({
                    succes: false,
                    message: error.message
                });
            }
        }
    }
    console.error('error assigning order:');
};
exports.assignOrder = assignOrder;
const getOrdersForMechanic = async (req, res) => {
    try {
        const mechanicId = req.user?.id;
        if (!mechanicId) {
            res.status(401).json({
                success: false,
                message: "unauthorized:user not authenticated"
            });
        }
        const orders = await orderService.getOrdersForMechanic(String(mechanicId));
        res.status(200).json({
            success: true,
            message: 'order retrieved successfully',
            data: orders
        });
    }
    catch (error) {
        console.error('error fetching mechanic orders', error);
        return res.status(400).json({
            success: false,
            message: 'faild to retrieve'
        });
    }
};
exports.getOrdersForMechanic = getOrdersForMechanic;
