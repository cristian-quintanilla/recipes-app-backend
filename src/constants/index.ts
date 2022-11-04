export const errorName = {
  CATEGORIES_ERROR: 'CATEGORIES_ERROR',
  COMMENT_LENGTH: 'COMMENT_LENGTH',
  CREATE_RECIPE: 'CREATE_RECIPE',
  EMAIL_IN_USE: 'EMAIL_IN_USE',
  INVALID_TOKEN: 'INVALID_TOKEN',
  PERMISSIONS_DENIED: 'PERMISSIONS_DENIED',
  RECIPE_NOT_FOUND: 'RECIPE_NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
  UPDATE_RECIPE: 'UPDATE_RECIPE',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_UPDATE: 'USER_UPDATE',
  USER_VOTE_SAME: 'USER_VOTE_SAME',
  USER_VOTED: 'USER_VOTED',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
}

export const errorType = {
  CATEGORIES_ERROR: {
    message: 'An error ocurred getting the categories',
    statusCode: 500,
  },
  COMMENT_LENGTH: {
    message: 'Comment must be less than 250 characters',
    statusCode: 400,
  },
  CREATE_RECIPE: {
    message: 'An error ocurred creating the recipe',
    statusCode: 500,
  },
  EMAIL_IN_USE: {
    message: 'E-mail already in use',
    statusCode: 400,
  },
  INVALID_TOKEN: {
    message: 'Invalid token',
    statusCode: 400,
  },
  PERMISSIONS_DENIED: {
    message: 'Permissions denied',
    statusCode: 403,
  },
  RECIPE_NOT_FOUND: {
    message: 'Recipe not found',
    statusCode: 404,
  },
  SERVER_ERROR: {
    message: 'Error creating the user',
    statusCode: 500,
  },
  UPDATE_PASSWORD: {
    message: 'An error ocurred updating the password',
    statusCode: 500,
  },
  UPDATE_RECIPE: {
    message: 'An error ocurred updating the recipe',
    statusCode: 500,
  },
  USER_NOT_FOUND: {
    message: 'User not found',
    statusCode: 404,
  },
  USER_UPDATE: {
    message: 'An error ocurred updating the user, try again',
    statusCode: 500,
  },
  USER_VOTE_SAME: {
    message: 'You cannot vote for your own recipe',
    statusCode: 400,
  },
  USER_VOTED: {
    message: 'You have already voted for this recipe',
    statusCode: 400,
  },
  WRONG_PASSWORD: {
    message: 'Wrong password, try again',
    statusCode: 400,
  },
};
