import mongoose, { Document, Model, Schema } from 'mongoose'
import { IFavorite } from '../interfaces/IFavorite'

interface Favorite extends IFavorite, Document {}

const favoriteSchema = new Schema<Favorite>(
  {
    userId: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    recipeId: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    recipeDetails: {
      title: { type: String, required: true },
      image: { type: String, required: true },
      sourceUrl: { type: String, required: true },
    },
  },
  { timestamps: true }
)

const FavoriteModel: Model<Favorite> = mongoose.model<Favorite>(
  'Favorite',
  favoriteSchema
)

export default FavoriteModel
