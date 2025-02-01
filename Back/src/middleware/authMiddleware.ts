import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  userId: string
  [key: string]: string
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: 'No token provided, authorization denied' })
    return
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid token : ', error })
  }
}
