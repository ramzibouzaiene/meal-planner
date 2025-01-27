import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import authRoutes from './routes/authRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'
import mealPlanRoutes from './routes/mealPlanRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

const PORT = 5000

app.use('/api/auth', authRoutes)
app.use('/api/favorites', authMiddleware, favoriteRoutes)
app.use('/api/mealPlans', authMiddleware, mealPlanRoutes)

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`)
})
