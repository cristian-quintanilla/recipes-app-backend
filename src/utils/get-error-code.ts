import { errorType } from '../constants';

interface ErrorInterface {
  EMAIL_IN_USE: string,
  SERVER_ERROR: string,
  USER_NOT_FOUND: string,
  WRONG_PASSWORD: string,
}

export const getErrorCode = (name: any) => {
  return errorType[name as keyof ErrorInterface];
}
