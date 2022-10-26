import { GraphQLNonNull, GraphQLString } from 'graphql';

import { newCategory } from './resolvers';
import { CategoryType } from './types';

export const createCategory = {
  type: CategoryType,
  description: 'Create a new category',
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (_parent: any, args: any) => {
    return newCategory(args);
  }
}
