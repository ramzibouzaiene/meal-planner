import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { LoginData, RegisterData } from '../interfaces/Auth'
import User from '../models/User'
import { IUser } from '../interfaces/IUser'
import { ValidationError } from '../errors/ValidationError'
import { UnauthorizedError } from '../errors/UnauthorizedError'
import { logger } from '../config/winston'

/**
 * @function registerUser
 * @description Registers a new user by validating email, hashing the password, and saving the user in the database
 * @param {Request} req - The request object containing user data
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @returns {Promise<void>} - A promise indicating the completion of the operation
 * @throws {ValidationError} If the email is already in use
 */
export const registerUser = async (
  req: Request<object, object, RegisterData>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      logger.error('Email already used')
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
      logger.info('User successfully created')
    }
  } catch (error) {
    next(error)
  }
}

/**
 * @function login
 * @description Authenticates a user by comparing credentials and returning a JWT token if valid
 * @param {Request} req - The request object containing user credentials
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @returns {Promise<void>} - A promise indicating the completion of the operation
 * @throws {UnauthorizedError} If the user is not found or credentials are invalid
 * @throws {ValidationError} If the authentication credentials are invalid
 */
export const login = async (
  req: Request<object, object, LoginData>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body

  try {
    const user: IUser | null = await User.findOne({ email })

    if (!user) {
      logger.error('User not found')
      throw new UnauthorizedError('Authentication Failed: User not found')
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password as string
    )

    if (!isPasswordValid) {
      logger.error('Invalid user credentials')
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
    logger.info('User Authenticated successfully')
  } catch (error) {
    next(error)
  }
}

/**
 * @function getAllUsers
 * @description Fetches all users from the database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @returns {Promise<void>} - A promise indicating the completion of the operation
 */
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
    logger.info('Users list fetched successfully')
  } catch (error) {
    next(error)
  }
}
