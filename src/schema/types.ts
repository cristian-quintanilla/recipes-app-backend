import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { DateResolver } from 'graphql-scalars';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User information',
  fields: () => ({
    age: { type: GraphQLInt },
    email: { type: GraphQLString },
    favoriteRecipe: { type: GraphQLString },
    id: { type: GraphQLID },
    imageUrl: { type: GraphQLString },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

export const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'Category of a recipe',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, _args) {
        // Parent gets the category found
        // TODO: Get author from db based on category id
        console.log(parent);
        return null;
      }
    }
  }),
});

export const IngredientType = new GraphQLObjectType({
  name: 'Ingredient',
  description: 'A single ingredient object',
  fields: () => ({
    name: { type: GraphQLString }
  })
});

export const StepType = new GraphQLObjectType({
  name: 'Step',
  description: 'A single step object',
  fields: () => ({
    step: { type: GraphQLInt },
    description: { type: GraphQLString },
  })
});

export const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'A single comment object',
  fields: () => ({
    comment: { type: GraphQLString },
    date: { type: DateResolver },
    user: { type: UserType },
  })
});

export const RecipeType = new GraphQLObjectType({
  name: 'Recipe',
  description: 'Recipe information',
  fields: () => ({
    comments: { type: new GraphQLList(CommentType) },
    description: { type: GraphQLString },
    id: { type: GraphQLID },
    imageUrl: { type: GraphQLString },
    ingredients: { type: new GraphQLList(IngredientType) },
    likes: { type: GraphQLInt },
    name: { type: GraphQLString },
    servings: { type: GraphQLInt },
    steps: { type: new GraphQLList(StepType) },
    timeCooking: { type: GraphQLString },
    timePreparation: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve(parent, _args) {
        // Parent gets the recipe found
        // TODO: Get category from db
        console.log(parent);
        return null;
      }
    },
    user: {
      type: UserType,
      resolve(parent, _args) {
        // Parent gets the recipe found
        // TODO: Get user from db
        console.log(parent);
        return null;
      }
    }
  }),
});
