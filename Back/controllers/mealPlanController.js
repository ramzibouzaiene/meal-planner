import { v4 as uuidv4 } from 'uuid'
import MealPlan from '../models/Favorite.js'

const addMeal = async (req, res) => {
  const { userId, week, recipes } = req.body

  try {
    const newMeal = new MealPlan({
      userId,
      week,
      recipes,
    })
    await newMeal.save()
    return res.status(201).json({
      message: 'Meal Plan successfully created',
      result: newMealPlan,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}
const updateMeal = async (req, res) => {
  const { id } = req.params
  const { week, recipes } = req.body

  try {
    const mealPlan = await MealPlan.findById(id)

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal Plan not found' })
    }
    mealPlan.week = week
    mealPlan.recipes = recipes

    await mealPlan.save()
    return res.status(200).json({
      message: 'Meal Plan successfully updated',
      result: mealPlan,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}
const getAllMeals = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find()
    return res.status(200).json({
      message: 'Meal Plans fetched successfully',
      data: mealPlans,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}
const deleteMeal = async (req, res) => {
  const { id } = req.params

  try {
    const mealPlan = await MealPlan.findByIdAndDelete(id)
    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal Plan not found' })
    }

    return res.status(200).json({
      message: 'Meal Plan successfully deleted',
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

export default { addMeal, updateMeal, getAllMeals, deleteMeal }
