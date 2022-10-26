import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'Category of a recipe',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});
