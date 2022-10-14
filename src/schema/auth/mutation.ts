import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import { AuthType } from './types';
import { login, register } from './resolvers';

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
