import express, { Router } from 'express'
import { registerUser, login, getAllUsers } from '../controllers/authController'
const router: Router = express.Router()

router.post('/register', registerUser)
router.post('/login', login)
router.get('/getAllUsers', getAllUsers)

export default router
