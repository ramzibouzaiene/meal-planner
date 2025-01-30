import mongoose from 'mongoose'
import { Request, Response } from 'express'
import Meal from '../models/Meal'
import { IMealPlan } from '../interfaces/IMealPlan'

const addMeal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, week, recipes } = req.body

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'Invalid userId' })
    }

    const newMeal = new Meal({
      userId,
      week,
      recipes,
    })
    const savedMeal: IMealPlan = await newMeal.save()
    res.status(200).json({
      message: 'Meal Plan successfully created',
      data: savedMeal,
    })
  } catch (error) {
    res.status(200).json({
      message: (error as Error).message,
      status: res.status(500),
    })
  }
}

const updateMeal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { userId, week, recipes } = req.body

    const mealPlan = await Meal.findById(id)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'Invalid userId' })
    }

    if (!mealPlan) {
      res.status(404).json({ message: 'Meal Plan not found' })
    }
    mealPlan.week = week
    mealPlan.recipes = recipes

    const updatedMeal: IMealPlan = await mealPlan.save()

    res.status(200).json({
      message: 'Meal Plan successfully updated',
      data: updatedMeal,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const getAllMeals = async (req: Request, res: Response): Promise<void> => {
  try {
    const mealPlans = await Meal.find()

    res.status(200).json({
      message: 'Meal Plans fetched successfully',
      data: mealPlans,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
const deleteMeal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const mealPlan = await Meal.findByIdAndDelete(id)
    if (!mealPlan) {
      res.status(404).json({ message: 'Meal Plan not found' })
    }

    res.status(200).json({
      message: 'Meal Plan successfully deleted',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export default { addMeal, updateMeal, getAllMeals, deleteMeal }
