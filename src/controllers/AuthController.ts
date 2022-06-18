import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import UserModel from '../models/User';
import { DataStoredInToken } from '../interfaces/token';
import generateJWT from '../utils/generate-jwt';

class AuthController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
			// Verify if the user exists
			let user = await UserModel.findOne({ email });

      if (!user) {
				return res.status(400).json({ ok: false, msg: 'The user does not exist' });
			}

			// Verify if the password is correct
			const passwordCorrect = await bcrypt.compare(password, user.password);
			if (!passwordCorrect) {
				return res.status(400).json({ msg: 'Password is incorrect.' });
			}

			// Create and assign a token
			const payload: DataStoredInToken = {
				user: {
					_id: user.id,
					name: user.name,
          email: user.email,
				}
			}

			const token = await generateJWT(payload);
			res.status(201).json({ token });
		} catch (err) {
			return res.status(401).json({ msg: 'Unauthorized user.' });
		}
  }

  public async register(req: Request, res: Response) {
    console.log('register');
  }

  public async getMe(req: Request, res: Response) {
    console.log('me');
  }
}

export const authController = new AuthController();
