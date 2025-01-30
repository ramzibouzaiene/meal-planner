import { v4 as uuidv4 } from 'uuid'
import Favorite from '../models/Favorite'
import mongoose from 'mongoose'
import { Request, Response } from 'express'
import { IFavorite } from '../interfaces/IFavorite'

const AddFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, recipeDetails } = req.body

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'Invalid userId' })
    }

    const recipeId = uuidv4()

    const newFavorite = new Favorite({
      recipeId,
      userId,
      recipeDetails,
    })

    const savedFavorite: IFavorite = await newFavorite.save()

    res.status(201).json({
      message: 'Favorite successfully created',
      data: savedFavorite,
    })
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
    })
  }
}

export const UpdateFavorite = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const updateData = req.body.recipeDetails

  try {
    const favorite: IFavorite | null = await Favorite.findById(id)

    if (!favorite) {
      res.status(404).json({ message: 'Favorite not found' })
    }

    const updatedFavorite: IFavorite | null = await Favorite.findByIdAndUpdate(
      id,
      {
        $set: {
          'recipeDetails.title':
            updateData.title || favorite?.recipeDetails.title,
          'recipeDetails.image':
            updateData.image || favorite?.recipeDetails.image,
          'recipeDetails.sourceUrl':
            updateData.sourceUrl || favorite?.recipeDetails.sourceUrl,
        },
      },
      { new: true, runValidators: true }
    )

    res.status(200).json({ favorite: updatedFavorite })
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
    })
  }
}

const getAllFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const favorites: IFavorite[] = await Favorite.find()

    res.status(200).json({
      message: 'Favorites fetched successfully',
      data: favorites,
    })
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
    })
  }
}

const deleteFavorite = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  try {
    const favorite: IFavorite | null = await Favorite.findByIdAndDelete(id)
    if (!favorite) {
      res.status(404).json({ message: 'Favorite not found' })
    }

    res.status(200).json({
      message: 'Favorite successfully deleted',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const getFavoriteById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const favoriteDetails: IFavorite | null = await Favorite.findById(id)
    if (!favoriteDetails) {
      res.status(404).json({ message: 'Favorite not found' })
    }
    res.status(200).json({
      favorite: favoriteDetails,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export default {
  AddFavorite,
  UpdateFavorite,
  getAllFavorites,
  deleteFavorite,
  getFavoriteById,
}
