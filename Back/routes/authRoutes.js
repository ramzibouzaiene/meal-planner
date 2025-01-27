import express from 'express'
import authController from '../controllers/authController.js'
const router = express.Router()

router.post('/register', authController.registerUser)
router.post('/login', authController.login)
router.get('/getAllUsers', authController.getAllUsers)

export default router
