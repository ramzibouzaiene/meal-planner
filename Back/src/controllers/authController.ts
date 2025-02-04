import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { LoginData, RegisterData } from '../interfaces/Auth'
import User from '../models/User'
import { IUser } from '../interfaces/IUser'
import { ValidationError } from '../errors/ValidationError'
import { UnauthorizedError } from '../errors/UnauthorizedError'

export const registerUser = async (
  req: Request<object, object, RegisterData>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new ValidationError('Email already used')
    } else {
      const userId = uuidv4()
      const hash = await bcrypt.hash(password, 10)

      const user: IUser = new User({
        userId,
        username,
        email,
        password: hash,
        favorites: [],
        mealPlans: [],
      })

      const savedUser = await user.save()

      res.status(201).json({
        message: 'User successfully created',
        success: true,
        result: savedUser,
      })
    }
  } catch (error) {
    next(error)
  }
}

export const login = async (
  req: Request<object, object, LoginData>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body

  try {
    const user: IUser | null = await User.findOne({ email })

    if (!user) {
      throw new UnauthorizedError('Authentication Failed: User not found')
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password as string
    )

    if (!isPasswordValid) {
      throw new ValidationError('Authentication Failed: Invalid credentials')
    }

    const jwtToken = jwt.sign(
      {
        email: user?.email,
        userId: user?._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    )

    res.status(200).json({
      message: 'Authentication Successful',
      success: true,
      accessToken: jwtToken,
      userId: user?._id,
    })
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.find()
    res.status(200).json({
      data: users,
      success: true,
      message: 'users list',
    })
  } catch (error) {
    next(error)
  }
}
