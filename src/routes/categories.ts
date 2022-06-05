import { Router } from 'express';

// TODO: Auth Middleware
import { categoriesController } from '../controllers';

class CategoriesRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', categoriesController.getCategories);
    this.router.get('/:id', categoriesController.getCategory);
    this.router.post('/', categoriesController.createCategory);
    this.router.put('/:id', categoriesController.updateCategory);
    this.router.delete('/:id', categoriesController.deleteCategory);
  }
}

export const categoriesRoutes = new CategoriesRoutes();
