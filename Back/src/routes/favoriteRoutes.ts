import express, { Router } from 'express'
import favoriteController from '../controllers/FavoriteController'
const router: Router = express.Router()

router.post('/', favoriteController.AddFavorite)
router.put('/:id', favoriteController.UpdateFavorite)
router.get('/', favoriteController.getAllFavorites)
router.delete('/:id', favoriteController.deleteFavorite)
router.get('/:id', favoriteController.getFavoriteById)

export default router
