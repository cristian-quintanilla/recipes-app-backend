import { Request, Response } from 'express';

import CategoryModel from '../models/Category';
import { getUser } from '../middlewares/auth';
import { RequestWithUser } from '../interfaces';

class CategoriesController {
  public async getCategories(req: Request, res: Response) {
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    CategoryModel.find({ user: user?._id }).populate({
      path: 'user',
      select: '_id name email'
    }).exec().then(categories => {
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
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    CategoryModel.findById(id).populate({
      path: 'user',
      select: '_id name email'
    }).exec().then(category => {
      // Category does not exist
      if (!category) {
        return res.status(404).json({ ok: false, msg: 'Category not found' });
      }

      // Check if the user is the owner of the category
      if (category?.user._id.toString() !== user?._id) {
        return res.status(403).json({ ok: false, msg: 'Forbidden' });
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
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);
    const { id } = req.params;

    CategoryModel.findByIdAndRemove(id).where('user').equals(user?._id).exec().then(category => {
      if (!category) {
        return res.status(404).json({ ok: false, msg: 'Forbidden' });
      }

      return res.status(200).json({
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

  public async deleteCategoriesByUser(userId: string) {
    return CategoryModel.deleteMany({ user: userId }).exec();
  }

  // Validate if the user is the owner of the category
  public async validateCategory(categoryId: string, userId: string) {
    const isOwner = await CategoryModel.findById(categoryId).where('user').equals(userId).exec();
    return isOwner;
  }
}

export const categoriesController = new CategoriesController();
