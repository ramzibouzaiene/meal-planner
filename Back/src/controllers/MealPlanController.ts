import mongoose from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import Meal from '../models/Meal'
import { IMealPlan } from '../interfaces/IMealPlan'
import { ValidationError } from '../errors/ValidationError'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

export const addMeal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, week, recipes } = req.body

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ValidationError('Invalid User ID')
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
  } catch (error) {
    next(error)
  }
}

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
      throw new ValidationError('Invalid User ID')
    }

    if (!mealPlan) {
      throw new ResourceNotFoundError('Meal Plan not found')
    }
    mealPlan.week = week
    mealPlan.recipes = recipes

    const updatedMeal: IMealPlan = await mealPlan.save()

    res.status(200).json({
      message: 'Meal Plan successfully updated',
      favorite: updatedMeal,
    })
  } catch (error) {
    next(error)
  }
}

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
  } catch (error) {
    next(error)
  }
}
export const deleteMeal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const mealPlan = await Meal.findByIdAndDelete(id)
    if (!mealPlan) {
      throw new ResourceNotFoundError('Meal Plan not found')
    }

    res.status(203).json({
      message: 'Meal Plan successfully deleted',
      favorite: [],
    })
  } catch (error) {
    next(error)
  }
}
