import jwt from 'jsonwebtoken';

import { DataStoredInToken } from '../interfaces';

export const validateToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DataStoredInToken;
    return decoded;
  } catch (err) {
    return null;
  }
}
