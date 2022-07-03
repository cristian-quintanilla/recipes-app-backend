import jwt from 'jsonwebtoken';

import { DataStoredInToken } from '../interfaces';

function generateJWT(payload: DataStoredInToken) {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, (process.env.JWT_SECRET as string), {
			expiresIn: '48h'
		}, (err, token) => {
			if (err) {
				reject('Error al generar el Token');
			}

			resolve(token);
		});
	});
}

export default generateJWT;
