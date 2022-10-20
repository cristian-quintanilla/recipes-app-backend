import { getLoggedUser } from './resolvers';
import { UserType } from './types';

export const getMe = {
  type: UserType,
  description: 'Get logged in user information',
  resolve: (_parent: any, _args: any, context: any) => {
    return getLoggedUser(context);
  }
}
