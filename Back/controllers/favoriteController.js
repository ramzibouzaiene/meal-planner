import { v4 as uuidv4 } from 'uuid'
import Favorite from '../models/Favorite.js'
import mongoose from 'mongoose'

const AddFavorite = (req, res) => {
  const { userId, recipeDetails } = req.body

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId' })
  }

  const recipeId = uuidv4()

  const newFavorite = new Favorite({
    recipeId: recipeId,
    userId: userId,
    recipeDetails: recipeDetails,
  })

  newFavorite
    .save()
    .then((response) => {
      return res.status(201).json({
        message: 'Favorite successfully created',
        result: response,
      })
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      })
    })
}

const UpdateFavorite = async (req, res) => {
  const { id } = req.params
  const { recipeDetails } = req.body

  try {
    const favorite = await Favorite.findById(id)
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' })
    }

    favorite.recipeDetails = recipeDetails
    await favorite.save()

    return res.status(200).json({
      message: 'Favorite successfully updated',
      result: favorite,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

const getAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find()
    return res.status(200).json({
      message: 'Favorites fetched successfully',
      data: favorites,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

const deleteFavorite = async (req, res) => {
  const { id } = req.params

  try {
    const favorite = await Favorite.findByIdAndDelete(id)
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' })
    }

    return res.status(200).json({
      message: 'Favorite successfully deleted',
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

export default { AddFavorite, UpdateFavorite, getAllFavorites, deleteFavorite }
