import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/database.js'
import { verifyToken } from './middleware/authMiddleware'
import authRoutes from './routes/authRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'
import mealPlanRoutes from './routes/mealRoutes.js'
import { globalErrorHandler } from './middleware/globalErrorHandler.js'

const app = express()

const port = 5000

dotenv.config()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use(verifyToken)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/mealPlans', mealPlanRoutes)
app.use(globalErrorHandler)
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
