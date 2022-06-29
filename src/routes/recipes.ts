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
    // Public routes (no auth)
    this.router.get('/public/:id', recipesController.getOneRecipe);
    this.router.get('/public', recipesController.getAllRecipes);

    // Private routes (only for logged users)
    this.router.use(authMiddleware);

    this.router.get('/', recipesController.getRecipes);

    this.router.get('/:id',
      [
        check('id', 'Invalid Mongo ID').isMongoId(),
        validateFields
      ],
      recipesController.getRecipe
    );

    this.router.post('/',
      [
        check('name', 'Name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('timePreparation', 'Time preparation is required').not().isEmpty(),
        check('timeCooking', 'Time cooking is required').not().isEmpty(),
        check('servings', 'Servings is required').not().isEmpty(),
        check('servings', 'Servings must be a number').isNumeric(),
        check('ingredients', 'Ingredients are required').not().isEmpty(),
        check('ingredients.*.name', 'Ingredient name is required').not().isEmpty(),
        check('steps', 'Steps are required').not().isEmpty(),
        check('steps.*.step', 'Step is required').not().isEmpty(),
        check('steps.*.description', 'Step description is required').not().isEmpty(),
        check('categoryId', 'Category is required').not().isEmpty(),
        check('categoryId', 'Invalid Mongo ID').isMongoId(),
        validateFields
      ],
      recipesController.createRecipe
    );

    this.router.put('/:id',
      [
        check('id', 'Invalid Mongo ID').isMongoId(),
        check('name', 'Name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('timePreparation', 'Time preparation is required').not().isEmpty(),
        check('timeCooking', 'Time cooking is required').not().isEmpty(),
        check('servings', 'Servings is required').not().isEmpty(),
        check('servings', 'Servings must be a number').isNumeric(),
        check('ingredients', 'Ingredients are required').not().isEmpty(),
        check('ingredients.*.name', 'Ingredient name is required').not().isEmpty(),
        check('steps', 'Steps are required').not().isEmpty(),
        check('steps.*.step', 'Step is required').not().isEmpty(),
        check('steps.*.description', 'Step description is required').not().isEmpty(),
        check('categoryId', 'Category is required').not().isEmpty(),
        check('categoryId', 'Invalid Mongo ID').isMongoId(),
        validateFields
      ],
      recipesController.updateRecipe
    );

    this.router.delete('/:id', recipesController.deleteRecipe);

    this.router.post('/comment/:id',
      [
        check('id', 'Invalid Mongo ID').isMongoId(),
        check('comment', 'Comment is required').not().isEmpty(),
        check('comment', 'Comment must be a string').isString(),
        validateFields
      ],
      recipesController.addComment
    );
  }
}

export const recipesRoutes = new RecipesRoutes();
