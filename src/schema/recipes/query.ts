import { GraphQLInt, GraphQLList, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';

import { getMostLikedRecipes, getRecipe, getRecipes } from './resolvers';
import { RecipeType } from './types';

export const recipes = {
  type: new GraphQLList(RecipeType),
  description: 'Get all recipes paginated',
  args: {
    page: { type: GraphQLInt },
    size: { type: GraphQLInt },
    search: { type: GraphQLString },
  },
  resolve: (_parent: any, args: any) => {
    return getRecipes(args);
  }
}

export const recipe = {
  type: RecipeType,
  description: 'Get one recipe by id',
  args: {
    recipeId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_parent: any, args: any) => {
    return getRecipe(args);
  }
}

export const mostLikedRecipes = {
  type: new GraphQLList(RecipeType),
  description: 'Get most liked recipes in the month',
  resolve: (_parent: any, _args: any) => {
    return getMostLikedRecipes();
  }
}
