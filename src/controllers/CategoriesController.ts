import { Request, Response } from 'express';

class CategoriesController {
  public async getCategories (_: Request, res: Response) {
    console.log('get categories');
  }

  public async getCategory (req: Request, res: Response) {
    console.log('get category');
  }

  public async createCategory (req: Request, res: Response) {
    console.log('create category');
  }

  public async updateCategory (req: Request, res: Response) {
    console.log('update category');
  }

  public async deleteCategory (req: Request, res: Response) {
    console.log('delete category');
  }
}

export const categoriesController = new CategoriesController();
