import Recipe from '../../models/Recipe';
import { errorName } from '../../constants';
import { validateID } from '../../utils/validate-token';

export const newRecipe = async (args: any, context: any) => {
  const id = validateID(context);

  // Validate user
  if (id || id !== 'Error: INVALID_TOKEN') {
    try {
      const recipe = Recipe.create({
        ...args,
        user: id
      });

      return recipe;
    } catch (err) {
      return new Error(errorName.CREATE_RECIPE);
    }
  } else {
    return new Error(errorName.USER_NOT_FOUND);
  }
}

export const editRecipe = async (args: any, context: any) => {
  // Verify if the recipe exists
  let recipe = await Recipe.findById(args.recipeId);

  if (!recipe) {
    return new Error(errorName.RECIPE_NOT_FOUND);
  }

  // Verify if the logged in user is the recipe owner
  const id = validateID(context);

  if (id !== recipe.user.toString()) {
    return new Error(errorName.PERMISSIONS_DENIED);
  } else {
    try {
      const newRecipe = Recipe.findByIdAndUpdate(args.recipeId, {
        ...args
      }, { new: true });

      return newRecipe;
    } catch (err) {
      return new Error(errorName.UPDATE_RECIPE);
    }
  }
}

export const removeRecipe = async (args: any, context: any) => {
  // Verify if the recipe exists
  let recipe = await Recipe.findById(args.recipeId);

  if (!recipe) {
    return new Error(errorName.RECIPE_NOT_FOUND);
  }

  // Verify if the logged in user is the recipe owner
  const id = validateID(context);

  if (id !== recipe.user.toString()) {
    return new Error(errorName.PERMISSIONS_DENIED);
  } else {
    try {
      const newRecipe = await Recipe.findByIdAndDelete(args.recipeId);
      return newRecipe;
    } catch (err) {
      return new Error(errorName.UPDATE_RECIPE);
    }
  }
}

export const deleteRecipesByUser = async (userId: string) => {
  return Recipe.deleteMany({ user: userId }).exec();
}
