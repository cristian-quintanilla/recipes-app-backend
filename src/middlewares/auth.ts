import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { DataStoredInToken, RequestWithUser } from '../interfaces';

export default (req: RequestWithUser, res: Response, next: NextFunction) => {
	// Read token from the header
	const token = <string>req.header('x-auth-token');

	// Check if there is a token
	if (!token) {
		return res.status(401).json({
      ok: false,
			msg: 'There is no token. Authorization denied'
		 });
	}

	// Validate the token
	try {
		const decoded = jwt.verify(token, <string>process.env.JWT_SECRET) as DataStoredInToken;
    req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid.' });
	}
}
