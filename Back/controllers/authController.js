import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import asyncHandler from 'express-async-handler'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, favorites, mealPlans } = req.body
  const existingUser = await User.findOne({ email: email })

  try {
    if (existingUser) {
      return res.status(403).json({
        message: 'Email already used',
      })
    } else {
      const userId = uuidv4()
      bycrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
          userId: userId,
          username: username,
          email: email,
          password: hash,
          favorites: favorites,
          mealPlans: mealPlans,
        })
        user
          .save()
          .then((response) => {
            return res.status(201).json({
              message: 'User successfully created',
              result: response,
              success: true,
            })
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            })
          })
      })
    }
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    })
  }
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(401).json({
        message: 'Authentication Failed: User not found',
        success: false,
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Authentication Failed: Invalid credentials',
        success: false,
      })
    }

    const jwtToken = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )

    return res.status(200).json({
      accessToken: jwtToken,
      userId: user._id,
      success: true,
    })
  } catch (err) {
    return res.status(500).json({
      message: `An error occurred: ${err.message}`,
      success: false,
    })
  }
})

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = User.find()
    return res.status(200).json({
      data: users,
      sucess: true,
      message: 'users list',
    })
  } catch (error) {
    return res.status(401).json({
      sucess: false,
      message: error.message,
    })
  }
})

export default { registerUser, login, getAllUsers }
