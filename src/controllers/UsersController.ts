import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import UserModel from '../models/User';
import { User } from '../interfaces';

class UsersController {
  public async createUser(userData: User, res: Response) {
    const { name, email, password } = userData;

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
    }).then(user => {
      return (user._id as string);
    }).catch(err => {
      res.status(500).json({ ok: false, msg: err.message });
    });
  }

  public async editUser(req: Request, res: Response) {
    const { name, email } = req.body;
    const { id } = req.params;

    // Check if the User exists
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ ok: false, msg: 'User not found.' });
    } else {
      UserModel.findByIdAndUpdate(id, {
        name,
        email,
      }).then(() => {
        res.status(200).json({ ok: true, msg: 'User updated successfully.' });
      }).catch(err => {
        res.status(500).json({ ok: false, msg: err.message });
      });
    }
  }

  public async updatePassword(req: Request, res: Response) {
    const { password } = req.body;
    const { id } = req.params;

    console.log(id);

    // Check if the User exists
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ ok: false, msg: 'User not found.' });
    } else {
      // Encrypt the password
      const salt = await bcryptjs.genSalt();
      const newPassword = await bcryptjs.hash(password, salt);

      UserModel.findByIdAndUpdate(id, {
        password: newPassword,
      }).then(() => {
        res.status(200).json({ ok: true, msg: 'Password updated successfully.' });
      }).catch(err => {
        res.status(500).json({ ok: false, msg: err.message });
      });
    }
  }

  public async updateImageUrl(req: Request, res: Response) {
    const { image } = req.body;
    const { id } = req.params;

    // Check if the User exists
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ ok: false, msg: 'User not found.' });
    } else {
      UserModel.findByIdAndUpdate(id, {
        imageUrl: image
      }).then(() => {
        res.status(200).json({ ok: true, msg: 'Image updated successfully.' });
      }).catch(err => {
        res.status(500).json({ ok: false, msg: err.message });
      });
    }
  }

  public deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    UserModel.findByIdAndDelete(id).then(() => {
      res.status(200).json({ ok: true, msg: 'User deleted successfully.' });
    }).catch(err => {
      res.status(500).json({ ok: false, msg: err.message });
    });
  }
}

export const usersController = new UsersController();
