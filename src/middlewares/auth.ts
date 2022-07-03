import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { DataStoredInToken, RequestWithUser } from '../interfaces';

const validateToken = (req: RequestWithUser, res: Response) => {
	// Read token from the header
	const token = req.header('x-auth-token') as string;

	// Check if there is a token
	if (!token) {
		return res.status(401).json({
      ok: false,
			msg: 'Sin token en la petición. Permiso denegado.'
		});
	}

	return token;
}

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
	try {
		const token = validateToken(req, res) as string;
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DataStoredInToken;

		req.user = decoded.user;
		next();
	} catch (err) {
		return res.status(401).json({ msg: 'El token no es válido' });
	}
}

export const getUser = (req: RequestWithUser, res: Response) => {
	try {
		const token = validateToken(req, res) as string;
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DataStoredInToken;

		return decoded.user;
	} catch (err) {
		res.status(401).json({ msg: 'El token no es válido' });
	}
}
