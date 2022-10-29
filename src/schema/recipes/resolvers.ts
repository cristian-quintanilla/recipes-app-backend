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
