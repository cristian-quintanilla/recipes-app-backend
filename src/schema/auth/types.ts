import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID, GraphQLList } from 'graphql';

import Recipe from '../../models/Recipe';
import { RecipeType } from '../recipes/types';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'User information',
  fields: () => ({
    age: { type: GraphQLInt },
    email: { type: GraphQLString },
    favoriteRecipe: { type: GraphQLString },
    _id: { type: GraphQLID },
    imageUrl: { type: GraphQLString },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    lastRecipes: {
      type: new GraphQLList(RecipeType),
      resolve(parent, _args) {
        // Parent gets the user found
        return Recipe.find({ user: parent._id }).sort({ createdAt: -1 }).limit(3);
      }
    },
  }),
});

export const AuthType = new GraphQLObjectType({
  name: 'Auth',
  description: 'Authentication token and message',
  fields: () => ({
    token: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});
