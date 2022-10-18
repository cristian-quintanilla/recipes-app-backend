import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID } from 'graphql';

export const UserType = new GraphQLObjectType({
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
