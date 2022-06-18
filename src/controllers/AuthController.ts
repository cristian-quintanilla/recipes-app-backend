import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import UserModel from '../models/User';
import generateJWT from '../utils/generate-jwt';
import { DataStoredInToken, User } from '../interfaces';
import { usersController } from './UsersController';

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
    const { name, email, password } = req.body;
		const newUser: User = {
			name,
			email,
			password
		}

		// Get user id
		const userId = await usersController.createUser(newUser, res);

		// Create and assign a token
		const payload: DataStoredInToken = {
			user: {
				_id: (userId as unknown as string),
				name,
				email,
			}
		}

		const token = await generateJWT(payload);
		res.status(201).json({ token });
  }

  public async getMe(req: Request, res: Response) {
    console.log('me');
  }
}

export const authController = new AuthController();
