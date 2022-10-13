import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

import { UserType } from '../auth/types';

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
