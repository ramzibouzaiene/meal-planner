import { v4 as uuidv4 } from 'uuid'
import Favorite from '../models/Favorite'
import mongoose from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import { IFavorite } from '../interfaces/IFavorite'
import { ValidationError } from '../errors/ValidationError'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

export const AddFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, recipeDetails } = req.body

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ValidationError('User ID is required')
    }

    // TODO Check if the user exists

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
    next(error)
  }
}

export const UpdateFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  const updateData = req.body.recipeDetails

  try {
    const favorite: IFavorite | null = await Favorite.findById(id)

    if (!favorite) {
      throw new ResourceNotFoundError('Favorite not found')
    }

    const updatedFavorite = await Favorite.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!updatedFavorite) {
      throw new ResourceNotFoundError('Favorite update failed')
    }

    res.status(200).json({
      message: 'Favorite updated successfully',
      favorite: updatedFavorite,
    })
  } catch (error) {
    next(error)
  }
}

export const getAllFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const favorites: IFavorite[] = await Favorite.find()

    res.status(200).json({
      message: 'Favorites fetched successfully',
      data: favorites,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  try {
    const favorite: IFavorite | null = await Favorite.findByIdAndDelete(id)
    if (!favorite) {
      throw new ResourceNotFoundError('Favorite not found')
    }

    res.status(203).json({
      message: 'Favorite successfully deleted',
    })
  } catch (error) {
    next(error)
  }
}

export const getFavoriteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  try {
    const favoriteDetails: IFavorite | null = await Favorite.findById(id)
    if (!favoriteDetails) {
      throw new ResourceNotFoundError('Favorite not found')
    }
    res.status(200).json({
      message: 'Favorite details fetched successfully',
      favorite: favoriteDetails,
    })
  } catch (error) {
    next(error)
  }
}
