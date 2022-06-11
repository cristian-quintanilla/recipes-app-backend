import { Request, Response } from 'express';

import CategoryModel, { Category } from '../models/Category';

class CategoriesController {
  public async getCategories (_: Request, res: Response) {
    console.log('get categories');
  }

  public async getCategory (req: Request, res: Response) {
    console.log('get category');
  }

  public async createCategory (req: Request, res: Response) {
    try {
      const { name } = req.body;

      const category: Category = new CategoryModel({
        name,
      });

      await category.save();
      res.status(201).json({
        category,
        message: 'Category created successfully',
      });
    } catch (err) {
      res.status(500).json({ msg: 'An error ocurred while creating the category.' });
    }
  }

  public async updateCategory (req: Request, res: Response) {
    console.log('update category');
  }

  public async deleteCategory (req: Request, res: Response) {
    console.log('delete category');
  }
}

export const categoriesController = new CategoriesController();
