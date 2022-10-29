import { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID } from 'graphql';

import { newRecipe } from './resolvers';
import { IngredientInputType, RecipeType, StepInputType } from './types';

export const createRecipe = {
  type: RecipeType,
  description: 'Create a new recipe by user',
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    timePreparation:  { type: new GraphQLNonNull(GraphQLString) },
    timeCooking: { type: new GraphQLNonNull(GraphQLString) },
    servings: { type: new GraphQLNonNull(GraphQLInt) },
    ingredients: { type: new GraphQLNonNull( new GraphQLList(IngredientInputType) ) },
    steps: { type: new GraphQLNonNull( new GraphQLList(StepInputType) ) },
    imageUrl: { type: GraphQLString },
    category: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_parent: any, args: any, context: any) => {
    return newRecipe(args, context);
  }
}
