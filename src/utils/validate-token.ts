import jwt from 'jsonwebtoken';

import { errorName } from '../constants';
import { DataStoredInToken } from '../interfaces';

export const validateToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DataStoredInToken;
    return decoded;
  } catch (err) {
    throw new Error(errorName.INVALID_TOKEN);
  }
}

export const validateID = (context: any) => {
  const { authorization } = context.headers;

  if (!authorization) {
    return new Error(errorName.INVALID_TOKEN);
  }

  // Validate token
  try {
    const token = authorization.split(' ')[1];
    const userToken = validateToken(token);
    return userToken?.user?._id || null;
  } catch (err) {
    return new Error(errorName.INVALID_TOKEN);
  }
}
