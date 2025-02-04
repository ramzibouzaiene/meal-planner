import express, { Router } from 'express'
import { registerUser, login, getAllUsers } from '../controllers/authController'
const router: Router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and management
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterData'
 *     responses:
 *       201:
 *         description: User successfully created.
 *       400:
 *         description: Email already used.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', registerUser)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginData'
 *     responses:
 *       200:
 *         description: Authentication Successful.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', login)

/**
 * @swagger
 * /api/auth/getAllUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: List of users.
 *       500:
 *         description: Internal server error.
 */
router.get('/getAllUsers', getAllUsers)

export default router
