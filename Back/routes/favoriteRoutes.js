import express from 'express'
import favoriteController from '../controllers/favoriteController.js'
const router = express.Router()

router.post('/', favoriteController.AddFavorite)
router.put('/:id', favoriteController.UpdateFavorite)
router.get('/', favoriteController.getAllFavorites)
router.delete('/:id', favoriteController.deleteFavorite)
router.get('/:id', favoriteController.getFavoriteById)

export default router
