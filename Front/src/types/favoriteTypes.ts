export interface RecipeDetails {
  title: string
  image: string
  sourceUrl: string
}

export interface Favorite {
  userId: string
  recipeId: string
  recipeDetails: RecipeDetails
}
