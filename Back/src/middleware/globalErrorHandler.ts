import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err)

  const statusCode = err.statusCode || 500
  const message = err.message || 'Something went wrong!'

  res.status(statusCode).json({
    status: 'error',
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
