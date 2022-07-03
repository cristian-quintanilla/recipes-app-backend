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

    this.router.get('/:id',
      [
        check('id', 'El ID es requerido').not().isEmpty(),
        check('id', 'ID no válido').isMongoId(),
        validateFields,
      ],
      categoriesController.getCategory
    );

    this.router.post('/',
      [
        check('name', 'El nombre es requerido').not().isEmpty(),
				check('name', 'El nombre debe de tener al menos 3 caracteres').isLength({ min: 3 }),
        validateFields
      ],
      categoriesController.createCategory
    );

    this.router.put('/:id',
      [
        check('id', 'El ID es requerido').not().isEmpty(),
        check('id', 'ID no válido').isMongoId(),
        check('name', 'El nombre es requerido').not().isEmpty(),
				check('name', 'El nombre debe de tener al menos 3 caracteres').isLength({ min: 3 }),
        validateFields
      ],
      categoriesController.updateCategory
    );

    this.router.delete('/:id', categoriesController.deleteCategory);
  }
}

export const categoriesRoutes = new CategoriesRoutes();
