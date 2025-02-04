import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/database'
import { verifyToken } from './middleware/authMiddleware'
import MealRoutes from './routes/mealRoutes'
import AuthRoutes from './routes/authRoutes'
import FavoriteRoutes from './routes/favoriteRoutes'
import { globalErrorHandler } from './middleware/globalErrorHandler'
import { logger } from './config/winston'
import { specs } from './config/swagger'
import swaggerUi from 'swagger-ui-express'

const app = express()

dotenv.config()

connectDB()

app.use(cors())
app.use(express.json())

// Serve Swagger API documentation
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
)

// Middleware to log HTTP requests
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.http(`${req.method} ${req.url}`)
  next()
})
// Public Controllers Routes
app.use('/api/auth', AuthRoutes)
app.use(verifyToken)

// Private Controllers Routes
app.use('/api/favorites', FavoriteRoutes)
app.use('/api/mealPlans', MealRoutes)

// Global Error Handler Middleware
app.use(globalErrorHandler)

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message)
  res.status(500).send('Internal Server Error')
})

export default app
