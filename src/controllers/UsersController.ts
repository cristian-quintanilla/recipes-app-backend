import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import UserModel from '../models/User';
import { categoriesController } from './CategoriesController';
import { recipesController } from './RecipesController';
import { getUser } from '../middlewares/auth';
import { RequestWithUser } from '../interfaces';

class UsersController {
  public async editUser(req: Request, res: Response) {
    const { name, image } = req.body;
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    // Check if the User exists
    const userFound = await UserModel.findById(user?._id);

    if (!userFound) {
      return res.status(404).json({ ok: false, msg: 'User not found' });
    } else {
      UserModel.findByIdAndUpdate(user?._id, {
        name,
        imageUrl: image
      }).then(() => {
        res.status(200).json({ ok: true, msg: 'User information updated successfully' });
      }).catch(err => {
        res.status(500).json({ ok: false, msg: err.message });
      });
    }
  }

  public async updatePassword(req: Request, res: Response) {
    const { password } = req.body;
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    // Check if the User exists
    const userFound = await UserModel.findById(user?._id);

    if (!userFound) {
      return res.status(404).json({ ok: false, msg: 'User not found' });
    } else {
      // Encrypt the password
      const salt = await bcryptjs.genSalt();
      const newPassword = await bcryptjs.hash(password, salt);

      UserModel.findByIdAndUpdate(user?._id, {
        password: newPassword,
      }).then(() => {
        res.status(200).json({ ok: true, msg: 'Password updated successfully' });
      }).catch(err => {
        res.status(500).json({ ok: false, msg: err.message });
      });
    }
  }

  public deleteUser(req: Request, res: Response) {
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    UserModel.findByIdAndDelete(user?._id).then(async () => {
      await categoriesController.deleteCategoriesByUser((user?._id as string));
      await recipesController.deleteRecipesByUser((user?._id as string));

      res.status(200).json({ ok: true, msg: 'User deleted successfully' });
    }).catch(err => {
      res.status(500).json({ ok: false, msg: err.message });
    });
  }
}

export const usersController = new UsersController();
