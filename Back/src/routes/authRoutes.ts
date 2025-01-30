import express, { Router } from 'express'
import authController from '../controllers/authController'
const router: Router = express.Router()

router.post('/register', authController.registerUser)
router.post('/login', authController.login)
router.get('/getAllUsers', authController.getAllUsers)

export default router
