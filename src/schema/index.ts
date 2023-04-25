import { GraphQLSchema, GraphQLObjectType } from 'graphql';

// Account
import { authLogin, createAccount, deleteAccount, updateAccount, updatePassword } from './auth/mutation';
import { getMe, getUser, renewToken } from './auth/query';

// Categories
import { createCategory } from './categories/mutation';
import { categories } from './categories/query';

// Recipes
import { commentRecipe, createRecipe, deleteRecipe, likeRecipe, updateRecipe } from './recipes/mutation';
import { mostLikedRecipes, recipe, recipes } from './recipes/query';

export const schema = new GraphQLSchema({
  mutation: new GraphQLObjectType({
    name: 'MutationType',
    fields: {
      // Account
      authLogin,
      createAccount,
      deleteAccount,
      updateAccount,
      updatePassword,

      // Categories
      createCategory,

      // Recipes
      commentRecipe,
      createRecipe,
      deleteRecipe,
      likeRecipe,
      updateRecipe,
    },
  }),
  query: new GraphQLObjectType({
    name: 'QueryType',
    fields: {
      // User
      getMe,
      getUser,
      renewToken,

      // Categories
      categories,

      // Recipes
      mostLikedRecipes,
      recipe,
      recipes,
    },
  }),
});
