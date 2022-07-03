import { Request, Response } from 'express';

import CategoryModel from '../models/Category';
import validateCategory from '../utils/validate-category';
import { getUser } from '../middlewares/auth';
import { RequestWithUser } from '../interfaces';

class CategoriesController {
  public async getCategories(req: Request, res: Response) {
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    try {
      const categories = await validateCategory(user?._id || '');
      return res.status(200).json({
        ok: true,
        categories,
      });
    } catch (err: any) {
      res.status(500).json({
        ok: false,
        msg: err.message
      });
    }
  }

  public async getCategory(req: Request, res: Response) {
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    try {
      const { id } = req.params;
      const category = await validateCategory(user?._id || '', id);

      if (!category) {
        return res.status(404).json({ ok: false, msg: 'Categoría no encontrada' });
      }

      return res.status(200).json({ ok: true, category });
    } catch (err: any) {
      res.status(500).json({
        ok: false,
        msg: err.message
      });
    }
  }

  public async createCategory(req: Request, res: Response) {
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    CategoryModel.create({
      name: req.body.name,
      user: user?._id
    }).then(category => {
      res.status(201).json({
        ok: true,
        category,
      });
    }).catch(err => {
      res.status(500).json({
        ok: false,
        msg: err.message
      });
    });
  }

  public async updateCategory(req: Request, res: Response) {
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    const { id } = req.params;
    const { name } = req.body;

    const category = await validateCategory(user?._id || '', id);

    if (!category) {
      return res.status(404).json({ ok: false, msg: 'Categoría no encontrada' });
    }

    CategoryModel.findByIdAndUpdate(id, { name }, { new: true }).exec()
    .then(category => {
      res.status(200).json({
        ok: true,
        msg: 'Categoría actualizada correctamente',
        category,
      });
    }).catch(err => {
      res.status(500).json({
        ok: false,
        msg: err.message
      });
    });
  }

  public async deleteCategory(req: Request, res: Response) {
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    const { id } = req.params;
    const category = await validateCategory(user?._id || '', id);

    if (!category) {
      return res.status(404).json({ ok: false, msg: 'Categoría no encontrada' });
    }

    CategoryModel.findByIdAndRemove(id).then(category => {
      res.status(200).json({
        ok: true,
        msg: 'Categoría eliminada correctamente',
        category,
      });
    }).catch(err => {
      res.status(500).json({
        ok: false,
        msg: err.message
      });
    });
  }

  public async deleteCategoriesByUser(userId: string) {
    return CategoryModel.deleteMany({ user: userId }).exec();
  }
}

export const categoriesController = new CategoriesController();
