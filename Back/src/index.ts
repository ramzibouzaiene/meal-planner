import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/database.js'
import { verifyToken } from './middleware/authMiddleware'
import authRoutes from './routes/authRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'
import mealPlanRoutes from './routes/mealRoutes.js'
import { globalErrorHandler } from './middleware/globalErrorHandler.js'
import { logger } from './config/winston.js'

const app = express()

const port = 5000

dotenv.config()

connectDB()

app.use(cors())
app.use(express.json())
// Middleware to log HTTP requests
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.http(`${req.method} ${req.url}`)
  next()
})
app.use('/api/auth', authRoutes)
app.use(verifyToken)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/mealPlans', mealPlanRoutes)
app.use(globalErrorHandler)
// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message)
  res.status(500).send('Internal Server Error')
})
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
