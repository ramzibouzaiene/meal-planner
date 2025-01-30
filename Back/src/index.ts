import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/database.js'
import authMiddleware from './middleware/authMiddleware'
import authRoutes from './routes/authRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'
import mealPlanRoutes from './routes/mealRoutes.js'

const app = express()

const port = 5000

dotenv.config()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/favorites', authMiddleware, favoriteRoutes)
app.use('/api/mealPlans', authMiddleware, mealPlanRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
