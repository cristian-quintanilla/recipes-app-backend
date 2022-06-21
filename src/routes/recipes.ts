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
      [
        check('name', 'Name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('timePreparation', 'Time preparation is required').not().isEmpty(),
        check('timeCooking', 'Time cooking is required').not().isEmpty(),
        check('servings', 'Servings is required').not().isEmpty(),
        check('servings', 'Servings must be a number').isNumeric(),
        check('ingredients', 'Ingredients are required').not().isEmpty(),
        check('ingredients.*.quantity', 'Ingredient quantity is required').not().isEmpty(),
        check('ingredients.*.name', 'Ingredient name is required').not().isEmpty(),
        check('steps', 'Steps are required').not().isEmpty(),
        check('steps.*.step', 'Step is required').not().isEmpty(),
        check('steps.*.description', 'Step description is required').not().isEmpty(),
        check('categoryId', 'Category is required').not().isEmpty(),
        check('categoryId', 'Invalid Mongo ID').isMongoId(),
        validateFields
      ],
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
