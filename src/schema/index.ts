import { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

import { authLogin, createAccount } from './auth/mutation';

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
      author: {
        type: GraphQLString,
        description: 'Get an author information by id',
        resolve(_parent, _args) {
          return 'ASDASDASD';
        }
      },
    }
  })
});
