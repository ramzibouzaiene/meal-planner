export interface RecipeDetails {
  title: string
  image: string
  sourceUrl: string
}

export interface Favorite {
  userId: string | null
  recipeId: string
  recipeDetails: RecipeDetails
}
