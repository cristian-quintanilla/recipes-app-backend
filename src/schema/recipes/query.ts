import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';

import { getRecipes } from './resolvers';
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
