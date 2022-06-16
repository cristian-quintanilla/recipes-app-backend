import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import UserModel, { User } from '../models/User';

class UsersController {
  public async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    // Check if the Email already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ ok: false, msg: 'E-mail is already in use.' });
    }

    // Encrypt the password
    const salt = await bcryptjs.genSalt();
    const newPassword = await bcryptjs.hash(password, salt);

    // Create the user
    UserModel.create({
      name,
      email,
      password: newPassword,
    }).then(() => {
      res.status(201).json({ ok: true, mgs: 'User created successfully.' });
    }).catch(err => {
      res.status(500).json({ ok: false, msg: err.message });
    });
  }

  public async editUser(req: Request, res: Response) {
    console.log('editUser');
  }

  public deleteUser(req: Request, res: Response) {
    console.log('deleteUser');
  }
}

export const usersController = new UsersController();
