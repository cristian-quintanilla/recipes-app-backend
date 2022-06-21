import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import UserModel from '../models/User';
import generateJWT from '../utils/generate-jwt';
import { DataStoredInToken, RequestWithUser, User } from '../interfaces';

// TODO: Refactor this controller

class AuthController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
			// Verify if the user exists
			let user = await UserModel.findOne({ email });

      if (!user) {
				return res.status(400).json({ ok: false, msg: 'User not found with that Email' });
			}

			// Verify if the password is correct
			const passwordCorrect = await bcryptjs.compare(password, user.password);
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
			return res.status(500).json({ ok: false, msg: 'Error on the server.' });
		}
  }

  public async register(req: Request, res: Response) {
		const { name, email, password } = req.body;

    // Check if the Email already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ ok: false, msg: 'E-mail is already in use' });
    }

    // Encrypt the password
    const salt = await bcryptjs.genSalt();
    const newPassword = await bcryptjs.hash(password, salt);

    // Create the user
    UserModel.create({
      name,
      email,
      password: newPassword,
    }).then(async (user) => {
			// Create and assign a token
			const payload: DataStoredInToken = {
				user: {
					_id: user._id,
					name,
					email,
				}
			}

			const token = await generateJWT(payload);
			res.status(200).json({ ok: true, msg: 'User created successfully', token });
    }).catch(err => {
      res.status(500).json({ ok: false, msg: err.message });
    });
  }

  public async getMe(req: RequestWithUser, res: Response) {
		try {
			const user = await UserModel.findById(req.user?._id).select('_id name email');
			res.json({ user });
		} catch (err) {
			res.status(404).send({ msg: 'User not found.' });
		}
  }
}

export const authController = new AuthController();
