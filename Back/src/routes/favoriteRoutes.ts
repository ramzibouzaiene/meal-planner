import express, { Router } from 'express'
import {
  AddFavorite,
  UpdateFavorite,
  getAllFavorites,
  deleteFavorite,
  getFavoriteById,
} from '../controllers/FavoriteController'
const router: Router = express.Router()

router.post('/', AddFavorite)
router.put('/:id', UpdateFavorite)
router.get('/', getAllFavorites)
router.delete('/:id', deleteFavorite)
router.get('/:id', getFavoriteById)

export default router
