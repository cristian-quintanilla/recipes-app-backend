import { Request, Response } from 'express';

import CategoryModel, { Category } from '../models/Category';

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
    const { name } = req.body;

    CategoryModel.create({
      name,
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