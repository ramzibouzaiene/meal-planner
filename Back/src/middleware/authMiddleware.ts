import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  userId: string
  [key: string]: string
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res
      .status(401)
      .json({ message: 'No token provided, authorization denied' })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload
    req.user = decoded
    next()
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token : ', error })
  }
}

export default verifyToken
