import { Router } from 'express';
import { check } from 'express-validator';

import validateFields from '../middlewares/validate';
import { authMiddleware } from '../middlewares/auth';
import { recipesController } from '../controllers';

class RecipesRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', authMiddleware, recipesController.getRecipes);

    this.router.get('/:id', authMiddleware, recipesController.getRecipe);

    this.router.post('/',
      // [
      //   check('name', 'Name is required').not().isEmpty(),
      //   validateFields
      // ],
      authMiddleware,
      recipesController.createRecipe
    );

    this.router.put('/:id',
      // [
      //   check('name', 'Name is required').not().isEmpty(),
      //   validateFields
      // ],
      authMiddleware,
      recipesController.updateRecipe
    );

    this.router.delete('/:id', authMiddleware, recipesController.deleteRecipe);
  }
}

export const recipesRoutes = new RecipesRoutes();
