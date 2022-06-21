import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { DataStoredInToken, RequestWithUser } from '../interfaces';

const validateToken = (req: RequestWithUser, res: Response) => {
	// Read token from the header
	const token = <string>req.header('x-auth-token');

	// Check if there is a token
	if (!token) {
		return res.status(401).json({
      ok: false,
			msg: 'There is no token. Authorization denied'
		 });
	}

	return token;
}

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
	try {
		const token = validateToken(req, res) as string;
		const decoded = jwt.verify(token, <string>process.env.JWT_SECRET) as DataStoredInToken;

		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid.' });
	}
}

export const getUser = (req: RequestWithUser, res: Response) => {
	try {
		const token = validateToken(req, res) as string;
		const decoded = jwt.verify(token, <string>process.env.JWT_SECRET) as DataStoredInToken;

		return decoded.user;
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid.' });
	}
}
