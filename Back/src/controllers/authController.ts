import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { LoginData, RegisterData } from '../interfaces/Auth'
import User from '../models/User'
import { IUser } from '../interfaces/IUser'

const registerUser = async (
  req: Request<object, object, RegisterData>,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      res.status(403).json({
        message: 'Email already used',
        success: false,
      })
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
    res.status(500).json({
      message: (error as Error).message,
      success: false,
    })
  }
}

const login = async (
  req: Request<object, object, LoginData>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body

  try {
    const user: IUser | null = await User.findOne({ email })

    if (!user) {
      res.status(401).json({
        message: 'Authentication Failed: User not found',
        success: false,
      })
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string
    )

    if (!isPasswordValid) {
      res.status(401).json({
        message: 'Authentication Failed: Invalid credentials',
        success: false,
      })
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
      token: jwtToken,
      userId: user?._id,
    })
  } catch (err) {
    res.status(500).json({
      message: `An error occurred: ${err.message}`,
      success: false,
    })
  }
}

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find()
    res.status(200).json({
      data: users,
      success: true,
      message: 'users list',
    })
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    })
  }
}

export default { registerUser, login, getAllUsers }
