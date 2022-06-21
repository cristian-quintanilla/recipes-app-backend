import { Router } from 'express';
import { check } from 'express-validator';

import validateFields from '../middlewares/validate';
import { authMiddleware } from '../middlewares/auth';
import { categoriesController } from '../controllers';

class CategoriesRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
		this.router.use(authMiddleware);

    this.router.get('/', categoriesController.getCategories);

    this.router.get('/:id', categoriesController.getCategory);

    this.router.post('/',
      [
        check('name', 'Name is required').not().isEmpty(),
        validateFields
      ],
      categoriesController.createCategory
    );

    this.router.put('/:id',
      [
        check('name', 'Name is required').not().isEmpty(),
        validateFields
      ],
      categoriesController.updateCategory
    );

    this.router.delete('/:id', categoriesController.deleteCategory);
  }
}

export const categoriesRoutes = new CategoriesRoutes();
