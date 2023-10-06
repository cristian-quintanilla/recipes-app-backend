import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';

import { CategoryType } from '../categories/types';
import { UserType } from '../auth/types';
import Category from '../../models/Category';
import User from '../../models/User';

export const IngredientType = new GraphQLObjectType({
  name: 'Ingredient',
  description: 'A single ingredient object',
  fields: () => ({
    name: { type: GraphQLString },
  }),
});

export const IngredientInputType = new GraphQLInputObjectType({
  name: 'IngredientInput',
  description: 'A single ingredient input object',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const StepType = new GraphQLObjectType({
  name: 'Step',
  description: 'A single step object',
  fields: () => ({
    step: { type: GraphQLInt },
    description: { type: GraphQLString },
  }),
});

export const StepInputType = new GraphQLInputObjectType({
  name: 'StepInput',
  description: 'A single step input object',
  fields: () => ({
    step: { type: new GraphQLNonNull(GraphQLInt) },
    description: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'A single comment object',
  fields: () => ({
    comment: { type: GraphQLString },
    date: { type: DateTimeResolver },
    user: {
      type: UserType,
      resolve(parent, _args) {
        // Parent gets the recipe found
        const user = User.findById(parent.user);
        return user;
      },
    },
  }),
});

export const LikeType = new GraphQLObjectType({
  name: 'Like',
  description: 'A single like object',
  fields: () => ({
    date: { type: DateTimeResolver },
    user: {
      type: UserType,
      resolve(parent, _args) {
        // Parent gets the recipe found
        const user = User.findById(parent.user);
        return user;
      },
    },
  }),
});

export const RecipeType = new GraphQLObjectType({
  name: 'Recipe',
  description: 'Recipe information',
  fields: () => ({
    comments: { type: new GraphQLList(CommentType) },
    commentsCount: { type: GraphQLInt },
    description: { type: GraphQLString },
    id: { type: GraphQLID },
    imageUrl: { type: GraphQLString },
    ingredients: { type: new GraphQLList(IngredientType) },
    likes: { type: new GraphQLList(LikeType) },
    likesCount: { type: GraphQLInt },
    name: { type: GraphQLString },
    servings: { type: GraphQLInt },
    steps: { type: new GraphQLList(StepType) },
    timeCooking: { type: GraphQLString },
    timePreparation: { type: GraphQLString },
    userLiked: { type: GraphQLBoolean },
    category: {
      type: CategoryType,
      resolve(parent, _args) {
        // Parent gets the recipe found
        const category = Category.findById(parent.category);
        return category;
      },
    },
    user: {
      type: UserType,
      resolve(parent, _args) {
        // Parent gets the recipe found
        const user = User.findById(parent.user);
        return user;
      },
    },
  }),
});

export const RecipeTableType = new GraphQLObjectType({
  name: 'RecipeTableType',
  description: 'Recipes Table',
  fields: () => ({
    count: { type: GraphQLInt },
    recipes: { type: new GraphQLList(RecipeType) },
  })
});
