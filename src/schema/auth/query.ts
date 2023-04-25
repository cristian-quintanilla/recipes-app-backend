import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';

import { AuthType, UserType } from './types';
import { getLoggedUser, getProfile, renew } from './resolvers';

export const getMe = {
  type: UserType,
  description: 'Get logged in user information',
  resolve: (_parent: any, _args: any, context: any) => {
    return getLoggedUser(context);
  }
}

export const getUser = {
  type: UserType,
  description: 'Get profile of a user',
  args: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_parent: any, args: any) => {
    return getProfile(args);
  }
}

export const renewToken = {
  type: AuthType,
  description: 'Renew Token',
  resolve: (_parent: any, _args: any, context: any) => {
    return renew(context);
  }
}
