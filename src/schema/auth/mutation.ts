import { GraphQLNonNull, GraphQLString } from 'graphql';
import { GraphQLNonNegativeInt } from 'graphql-scalars';

import { AuthType, UserType } from './types';
import { editUser, login, register } from './resolvers';

export const createAccount = {
  type: AuthType,
  description: 'Create a new user',
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_parent: any, args: any) => {
    return register(args);
  }
}

export const authLogin = {
  type: AuthType,
  description: 'Login with user credentials',
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_parent: any, args: any) => {
    return login(args);
  }
}

export const updateAccount = {
  type: UserType,
  description: 'Update user data',
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    imageUrl: { type: GraphQLString },
    age: { type: GraphQLNonNegativeInt },
    favoriteRecipe: { type: GraphQLString },
  },
  resolve: (_parent: any, args: any, context: any) => {
    return editUser(context, args);
  }
}
