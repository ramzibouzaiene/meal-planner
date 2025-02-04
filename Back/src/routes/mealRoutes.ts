import express from 'express'
import {
  addMeal,
  updateMeal,
  getAllMeals,
  deleteMeal,
} from '../controllers/MealPlanController'
const router = express.Router()

router.post('/', addMeal)
router.put('/:id', updateMeal)
router.get('/', getAllMeals)
router.delete('/:id', deleteMeal)

export default router
