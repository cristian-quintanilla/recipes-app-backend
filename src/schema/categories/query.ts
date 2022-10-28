import { GraphQLList } from 'graphql';

import { getCategories } from './resolvers';
import { CategoryType } from './types';

export const categories = {
  type: new GraphQLList(CategoryType),
  description: 'Get all categories',
  resolve: (_parent: any, _args: any) => {
    return getCategories();
  }
}
