import { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID } from 'graphql';

import { addLike, addComment, editRecipe, newRecipe, removeRecipe } from './resolvers';
import { IngredientInputType, RecipeType, StepInputType, CommentType } from './types';

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

export const updateRecipe = {
  type: RecipeType,
  description: 'Update a recipe',
  args: {
    recipeId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    timePreparation:  { type: GraphQLString },
    timeCooking: { type: GraphQLString },
    servings: { type: GraphQLInt },
    ingredients: { type: new GraphQLList(IngredientInputType) },
    steps: { type: new GraphQLList(StepInputType)  },
    imageUrl: { type: GraphQLString },
    category: { type: GraphQLID },
  },
  resolve: (_parent: any, args: any, context: any) => {
    return editRecipe(args, context);
  }
}

export const deleteRecipe = {
  type: RecipeType,
  description: 'Delete a recipe',
  args: {
    recipeId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_parent: any, args: any, context: any) => {
    return removeRecipe(args, context);
  }
}

export const commentRecipe = {
  type: CommentType,
  description: 'Add comment to a recipe',
  args: {
    recipeId: { type: new GraphQLNonNull(GraphQLID) },
    comment: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (_parent: any, args: any, context: any) => {
    return addComment(args, context);
  }
}

export const likeRecipe = {
  type: RecipeType,
  description: 'Add like to a recipe',
  args: {
    recipeId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_parent: any, args: any, context: any) => {
    return addLike(args, context);
  }
}
