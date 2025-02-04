import mongoose from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import Meal from '../models/Meal'
import { IMealPlan } from '../interfaces/IMealPlan'
import { ValidationError } from '../errors/ValidationError'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'
import { logger } from '../config/winston'
import { CheckUser } from '../utils/checkUser'

/**
 * @function addMeal
 * @description Adds a new meal plan by validating the user, checking if the user exists, and then saving the meal plan
 * @param {Request} req - The request object containing userId, week, and recipes
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @returns {Promise<void>} - A promise indicating the completion of the operation
 * @throws {ValidationError} If the user ID is invalid
 * @throws {ResourceNotFoundError} If the user is not found
 */
export const addMeal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, week, recipes } = req.body

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      logger.error('Invalid User ID')
      throw new ValidationError('Invalid User ID')
    }
    const existingUser = await CheckUser(userId)
    if (!existingUser) {
      logger.error('User not found')
      throw new ResourceNotFoundError('User not found')
    }
    const newMeal = new Meal({
      userId,
      week,
      recipes,
    })
    const savedMeal: IMealPlan = await newMeal.save()
    res.status(200).json({
      message: 'Meal Plan successfully created',
      favorite: savedMeal,
    })
    logger.info('Meal Plan successfully created')
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateMeal
 * @description Updates an existing meal plan by ID and validates the user before saving the changes
 * @param {Request} req - The request object containing meal plan ID, userId, week, and recipes
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @returns {Promise<void>} - A promise indicating the completion of the operation
 * @throws {ValidationError} If the user ID is invalid
 * @throws {ResourceNotFoundError} If the user or meal plan is not found
 */
export const updateMeal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const { userId, week, recipes } = req.body

    const mealPlan = await Meal.findById(id)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      logger.error('Invalid User ID')
      throw new ValidationError('Invalid User ID')
    }
    const existingUser = await CheckUser(userId)
    if (!existingUser) {
      logger.error('User not found')
      throw new ResourceNotFoundError('User not found')
    }
    if (!mealPlan) {
      logger.error('Meal Plan not found')
      throw new ResourceNotFoundError('Meal Plan not found')
    }
    mealPlan.week = week
    mealPlan.recipes = recipes

    const updatedMeal: IMealPlan = await mealPlan.save()

    res.status(200).json({
      message: 'Meal Plan successfully updated',
      favorite: updatedMeal,
    })
    logger.info('Meal Plan successfully updated')
  } catch (error) {
    next(error)
  }
}

/**
 * @function getAllMeals
 * @description Retrieves all meal plans from the database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @returns {Promise<void>} - A promise indicating the completion of the operation
 */
export const getAllMeals = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const mealPlans = await Meal.find()

    res.status(200).json({
      message: 'Meal Plans fetched successfully',
      favorite: mealPlans,
    })
    logger.info('Meal Plans fetched successfully')
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteMeal
 * @description Deletes a meal plan by ID from the database
 * @param {Request} req - The request object containing the meal plan ID
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @returns {Promise<void>} - A promise indicating the completion of the operation
 * @throws {ResourceNotFoundError} If the meal plan is not found
 */
export const deleteMeal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const mealPlan = await Meal.findByIdAndDelete(id)
    if (!mealPlan) {
      logger.error('Meal Plan not found')
      throw new ResourceNotFoundError('Meal Plan not found')
    }

    res.status(203).json({
      message: 'Meal Plan successfully deleted',
      favorite: [],
    })
    logger.info('Meal Plan successfully deleted')
  } catch (error) {
    next(error)
  }
}
