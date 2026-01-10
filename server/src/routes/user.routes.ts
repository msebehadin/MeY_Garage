import {Router} from 'express'
import { requiredRole } from '../middlewares/requireRole'
import * as  userController from  '../controllers/user.controller'
import { authMIddleware } from '../middlewares/requireAuth'
const router=Router()
router.get('/',authMIddleware,requiredRole('ADMIN'),userController.getAllUsers)
router.put('/:id/role',authMIddleware,requiredRole('ADMIN'),userController.updateuserRole)
export default router