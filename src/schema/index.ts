import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { authLogin, createAccount } from './auth/mutation';
import { getMe, getUser } from './auth/query';

export const schema = new GraphQLSchema({
  mutation: new GraphQLObjectType({
    name: 'MutationType',
    fields: {
      authLogin,
      createAccount,
    }
  }),
  query: new GraphQLObjectType({
    name: 'QueryType',
    fields: {
      getMe,
      getUser
    }
  })
});
