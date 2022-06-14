import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import UserModel, { User } from '../models/User';

class UsersController {
  public async createUser(req: Request, res: Response) {
    console.log('createUser');
  }

  public async getUser(req: Request, res: Response) {
    console.log('getUser');
  }

  public async editUser(req: Request, res: Response) {
    console.log('editUser');
  }

  public deleteUser(req: Request, res: Response) {
    console.log('deleteUser');
  }
}

export const usersController = new UsersController();
