export const errorName = {
  EMAIL_IN_USE: 'EMAIL_IN_USE',
  SERVER_ERROR: 'SERVER_ERROR',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
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
};
