import { Request, RequestHandler, Response } from 'express';

import CategoryModel from '../models/Category';
import { getUser } from '../middlewares/auth';
import { RequestWithUser } from '../interfaces/index';

class CategoriesController {
  public async getCategories(_: Request, res: Response) {
    CategoryModel.find().exec().then(categories => {
      res.json({
        ok: true,
        categories,
      });
    }).catch(err => {
      res.status(500).json({
        ok: false,
        msg: err.message
      });
    });
  }

  public async getCategory(req: Request, res: Response) {
    const { id } = req.params;
    CategoryModel.findById(id).exec().then(category => {
      if (!category) {
        return res.status(404).json({ ok: false, msg: 'Category not found' });
      }

      res.status(200).json({ ok: true, category });
    }).catch(err => {
      res.status(500).json({
        ok: false,
        msg: err.message
      });
    });
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
    const { id } = req.params;
    const { name } = req.body;

    CategoryModel.findByIdAndUpdate(id, { name }, { new: true }).exec()
    .then(category => {
      res.status(200).json({
        ok: true,
        msg: 'Category updated successfully',
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
    const { id } = req.params;

    CategoryModel.findByIdAndRemove(id).exec().then(category => {
      if (!category) {
        return res.status(404).json({ ok: false, msg: 'Category not found' });
      }

      res.status(200).json({
        ok: true,
        msg: 'Category deleted successfully',
        category,
      });
    }).catch(err => {
      res.status(500).json({
        ok: false,
        msg: err.message
      });
    });
  }
}

export const categoriesController = new CategoriesController();
