export const errorName = {
  EMAIL_IN_USE: 'EMAIL_IN_USE',
  SERVER_ERROR: 'SERVER_ERROR',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
  INVALID_TOKEN: 'INVALID_TOKEN',
  USER_UPDATE: 'USER_UPDATE',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
  CATEGORIES_ERROR: 'CATEGORIES_ERROR',
  CREATE_RECIPE: 'CREATE_RECIPE',
}

export const errorType = {
  EMAIL_IN_USE: {
    message: 'E-mail already in use',
    statusCode: 400,
  },
  SERVER_ERROR: {
    message: 'Error creating the user',
    statusCode: 500,
  },
  USER_NOT_FOUND: {
    message: 'User not found',
    statusCode: 404,
  },
  WRONG_PASSWORD: {
    message: 'Wrong password, try again',
    statusCode: 400,
  },
  INVALID_TOKEN: {
    message: 'Invalid token',
    statusCode: 400,
  },
  USER_UPDATE: {
    message: 'An error ocurred updating the user, try again',
    statusCode: 500,
  },
  UPDATE_PASSWORD: {
    message: 'An error ocurred updating the password',
    statusCode: 500,
  },
  CATEGORIES_ERROR: {
    message: 'An error ocurred getting the categories',
    statusCode: 500,
  },
  CREATE_RECIPE: {
    message: 'An error ocurred creating the recipe',
    statusCode: 500,
  }
};
