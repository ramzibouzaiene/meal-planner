import { Favorite } from '../types/favoriteTypes'

const API_URL = 'http://localhost:5000/api/favorites'

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
}

export const addFavorite = async (
  favariteData: Favorite
): Promise<{ message: string }> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(favariteData),
    })
    if (!response.ok) {
      throw new Error('Error while creating new favorite')
    }
    return response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updateFavorite = async (
  favariteData: Favorite
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_URL}/${favariteData.recipeId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(favariteData),
    })
    if (!response.ok) {
      throw new Error('Error while updating favorite ')
    }
    return response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getAllFavorites = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers,
    })
    if (!response.ok) {
      throw new Error('Error while getting all favorite')
    }
    return response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deleteFavorite = async (
  favariteData: Favorite
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_URL}/${favariteData.recipeId}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(favariteData),
    })
    if (!response.ok) {
      throw new Error('Error while deleting favorite')
    }
    return response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}
