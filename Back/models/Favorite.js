import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipeDetails: {
      title: {
        type: String,
        required: true,
      },
      image: { type: String },
      sourceUrl: { type: String },
    },
  },
  { timestamps: true }
)

export default mongoose.model('Favorite', favoriteSchema)
