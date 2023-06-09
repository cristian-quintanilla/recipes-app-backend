import Recipe from '../../models/Recipe';
import { errorName } from '../../constants';
import { validateID } from '../../utils/validate-token';

export const newRecipe = async (args: any, context: any) => {
  const id = validateID(context);

  // Validate user
  if (!id?.toString().includes('INVALID_TOKEN')) {
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

export const addComment = async (args: any, context: any) => {
  const { recipeId, comment } = args;
  const id = validateID(context);

  // Verify if the recipe exists
  let recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    return new Error(errorName.RECIPE_NOT_FOUND);
  }

  // Validate comment length
  if (comment.length > 250) {
    return new Error(errorName.COMMENT_LENGTH);
  }

  // Add comment
  recipe.comments.push({ user: id as string, comment });
  recipe.save();
  return recipe.comments[recipe.comments.length - 1];
}

export const addLike = async (args: any, context: any) => {
  const { recipeId } = args;
  const id = validateID(context);

  // Verify if the recipe exists
  let recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    return new Error(errorName.RECIPE_NOT_FOUND);
  }

  // User has already vote
  if (recipe.likes.some(like => like.user.toString() === id!.toString())) {
    return new Error(errorName.USER_VOTED);
  }

  // User is same as author
  if (recipe.user.toString() === id) {
    return new Error(errorName.USER_VOTE_SAME);
  }

  // Add like
  recipe.likes.push({ user: id as string });
  recipe.save();
  return recipe;
}

export const getRecipes = async (args: any) => {
  const { page, size, substring } = args;

  let filters = substring ? {
    $or: [
      { name: { $regex: substring, $options: 'i' } },
      { description: { $regex: substring, $options: 'i' } },
    ]
  } : {};

  let recipes: any[] = [];

  await Recipe.find(filters)
  .limit(Number(size))
  .skip((Number(page) - 1) * Number(size))
  .sort({ createdAt: -1 }).then((data: any) => {
    data.map((recipe: any) => {
      recipe.commentsCount = recipe.comments.length || 0;
      recipe.likesCount = recipe.likes.length || 0;

      return recipe;
    });

    recipes = data;
  });

  return recipes;
}

export const getRecipe = async ({ recipeId }: any) => {
  let recipe = await Recipe.findById(recipeId);

  if (recipe) {
    recipe.commentsCount = recipe.comments.length || 0;
    recipe.likesCount = recipe.likes.length || 0;
  }

  return recipe ? recipe : new Error(errorName.RECIPE_NOT_FOUND);
}

export const getMostLikedRecipes = async () => {
  const now = new Date();
  // const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  // const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  // find({ 'likes.date': { $gte: firstDay, $lte: lastDay } });

  let recipes: any[] = [];

  await Recipe.find().sort({ likes: -1 }).limit(5).then((data: any) => {
    data.map((recipe: any) => {
      recipe.commentsCount = recipe.comments.length || 0;
      recipe.likesCount = recipe.likes.length || 0;

      return recipe;
    });

    recipes = data;
  });

  return recipes;
}
