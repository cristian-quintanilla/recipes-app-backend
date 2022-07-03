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
    this.router.get('/public/most-liked', recipesController.getMostLikedRecipes);

    this.router.get('/public/:id',
      [
        check('id', 'El ID es requerido').not().isEmpty(),
        check('id', 'ID no válido').isMongoId(),
        validateFields,
      ],
      recipesController.getOneRecipe
    );

    this.router.get('/public', recipesController.getAllRecipes);

    // Private routes (only for logged users)
    this.router.use(authMiddleware);

    this.router.get('/', recipesController.getRecipes);

    this.router.get('/:id',
      [
        check('id', 'El ID es requerido').not().isEmpty(),
        check('id', 'ID no válido').isMongoId(),
        validateFields
      ],
      recipesController.getRecipe
    );

    this.router.post('/',
      [
        check('name', 'El nombre es requerido').not().isEmpty(),
				check('name', 'El nombre debe de tener al menos 3 caracteres').isLength({ min: 3 }),
        check('description', 'La descripción es requerida').not().isEmpty(),
				check('description', 'La descripción debe de tener al menos 25 caracteres').isLength({ min: 25 }),
        check('timePreparation', 'El tiempo de preparación es requerido').not().isEmpty(),
        check('timeCooking', 'El tiempo de cocción es requerido').not().isEmpty(),
        check('servings', 'Las porciones son requeridas').not().isEmpty(),
        check('servings', 'Las porciones deben de ser un número').isNumeric(),
        check('ingredients', 'Los ingredientes son requeridos').not().isEmpty(),
        check('ingredients.*.name', 'El nombre del ingrediente es requerido').not().isEmpty(),
        check('steps', 'Los pasos son requeridos').not().isEmpty(),
        check('steps.*.step', 'El número de paso es requerido').not().isEmpty(),
        check('steps.*.description', 'La descripción del paso es requerida').not().isEmpty(),
        check('categoryId', 'La categoría es requerida').not().isEmpty(),
        check('categoryId', 'El ID de la categoría no es válido').isMongoId(),
        validateFields
      ],
      recipesController.createRecipe
    );

    this.router.put('/:id',
      [
        check('id', 'El ID es requerido').not().isEmpty(),
        check('id', 'ID no válido').isMongoId(),
        check('name', 'El nombre es requerido').not().isEmpty(),
				check('name', 'El nombre debe de tener al menos 3 caracteres').isLength({ min: 3 }),
        check('description', 'La descripción es requerida').not().isEmpty(),
				check('description', 'La descripción debe de tener al menos 25 caracteres').isLength({ min: 25 }),
        check('timePreparation', 'El tiempo de preparación es requerido').not().isEmpty(),
        check('timeCooking', 'El tiempo de cocción es requerido').not().isEmpty(),
        check('servings', 'Las porciones son requeridas').not().isEmpty(),
        check('servings', 'Las porciones deben de ser un número').isNumeric(),
        check('ingredients', 'Los ingredientes son requeridos').not().isEmpty(),
        check('ingredients.*.name', 'El nombre del ingrediente es requerido').not().isEmpty(),
        check('steps', 'Los pasos son requeridos').not().isEmpty(),
        check('steps.*.step', 'El número de paso es requerido').not().isEmpty(),
        check('steps.*.description', 'La descripción del paso es requerida').not().isEmpty(),
        check('categoryId', 'La categoría es requerida').not().isEmpty(),
        check('categoryId', 'El ID de la categoría no es válido').isMongoId(),
        validateFields
      ],
      recipesController.updateRecipe
    );

    this.router.delete('/:id', recipesController.deleteRecipe);

    this.router.post('/comment/:id',
      [
        check('id', 'El ID es requerido').not().isEmpty(),
        check('id', 'ID no válido').isMongoId(),
        check('comment', 'El comentario es requerido').not().isEmpty(),
        validateFields
      ],
      recipesController.addComment
    );

    this.router.post('/like/:id',
      [
        check('id', 'El ID es requerido').not().isEmpty(),
        check('id', 'ID no válido').isMongoId(),
        validateFields
      ],
      recipesController.likeRecipe
    );
  }
}

export const recipesRoutes = new RecipesRoutes();
