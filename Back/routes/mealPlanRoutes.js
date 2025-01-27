import express from 'express'
import mealPlanController from '../controllers/mealPlanController.js'
const router = express.Router()

router.post('/', mealPlanController.addMeal)
router.put('/:id', mealPlanController.updateMeal)
router.get('/', mealPlanController.getAllMeals)
router.delete('/:id', mealPlanController.deleteMeal)

export default router
