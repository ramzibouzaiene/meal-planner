import mongoose from 'mongoose'
import dayEnum from '../enums/DaysOfWeek'
import mealTypes from '../enums/MealTypes'
const mealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    week: {
      type: String,
      required: true,
    },
    recipes: {
      recipeId: { type: String, required: true },
      day: {
        type: String,
        enum: dayEnum,
        required: true,
      },
      mealType: {
        type: String,
        enum: mealTypes,
        required: true,
      },
      recipeDetails: {
        title: { type: String, required: true },
        image: { type: String },
        sourceUrl: { type: String },
      },
    },
  },
  { timestamps: true }
)

export default mongoose.model('MealPlan', mealPlanSchema)
