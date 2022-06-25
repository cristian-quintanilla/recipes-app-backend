import RecipeModel from '../models/Recipe';

async function validateRecipe(userId: string, recipeId?: string) {
  if (recipeId) {
    return await RecipeModel.findById(recipeId).where('user').equals(userId).populate([
      { path: 'category', select: 'name' },
      { path: 'user', select: 'name email' }
    ]).exec();
  } else {
    return await RecipeModel.find({ user: userId }).where('user').equals(userId).populate([
      { path: 'category', select: 'name' },
      { path: 'user', select: 'name email' }
    ]).exec();
  }
}

export default validateRecipe;
