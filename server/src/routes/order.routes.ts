import {Router} from 'express'
import * as orderController from '../controllers/order.controller'
import { authMIddleware } from '../middlewares/requireAuth'
import { requiredRole } from '../middlewares/requireRole'

const router = Router()


router.post('/', authMIddleware, orderController.createOrder)


router.put('/assign', authMIddleware, requiredRole('ADMIN'), orderController.assignOrder)


router.get('/mechanic', authMIddleware, requiredRole('MECHANIC'), orderController.getOrdersForMechanic)

export default router