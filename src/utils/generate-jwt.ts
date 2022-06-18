import jwt from 'jsonwebtoken';

import { DataStoredInToken } from '../interfaces/token';

function generateJWT(payload: DataStoredInToken) {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, (process.env.JWT_SECRET as string), {
			expiresIn: '48h'
		}, (err, token) => {
			if (err) {
				reject('Error generating token');
			}

			resolve(token);
		});
	});
}

export default generateJWT;
