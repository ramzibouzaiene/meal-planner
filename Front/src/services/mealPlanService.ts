import { MealPlan } from '../types/mealPlanTypes'

const API_URL = 'http://localhost:5000/api/mealPlans'

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
}

export const addMealPlan = async (
  mealPlanData: MealPlan
): Promise<{ message: string }> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(mealPlanData),
    })
    if (!response.ok) {
      throw new Error(
        `Error while creating MealPlan. Status: ${response.status}`
      )
    }
    return response.json()
  } catch (error) {
    throw new Error(`Failed to create MealPlan: ${error.message}`)
  }
}

export const updateMealPlan = async (
  mealPlanData: MealPlan
): Promise<{ message: string }> => {
  try {
    const response = await fetch(
      `${API_URL}/${mealPlanData.recipes[0]?.recipeId}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(mealPlanData),
      }
    )
    if (!response.ok) {
      throw new Error(
        `Error while updating MealPlan. Status: ${response.status}`
      )
    }
    return response.json()
  } catch (error) {
    throw new Error(`Failed to update MealPlan: ${error.message}`)
  }
}

export const getAllMealPlans = async (): Promise<MealPlan[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers,
    })
    if (!response.ok) {
      throw new Error(
        `Error while fetching MealPlans. Status: ${response.status}`
      )
    }
    return response.json()
  } catch (error) {
    throw new Error(`Failed to fetch MealPlans: ${error.message}`)
  }
}

export const deleteMealPlan = async (
  recipeId: string
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_URL}/${recipeId}`, {
      method: 'DELETE',
      headers,
    })
    if (!response.ok) {
      throw new Error(
        `Error while deleting MealPlan. Status: ${response.status}`
      )
    }
    return response.json()
  } catch (error) {
    throw new Error(`Failed to delete MealPlan: ${error.message}`)
  }
}
