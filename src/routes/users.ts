import { Router } from 'express';
import { check } from 'express-validator';

import validateFields from '../middlewares/validate';
import { authMiddleware } from '../middlewares/auth';
import { usersController } from '../controllers';

class UsersRoutes {
	public router: Router = Router();

	constructor() {
		this.config();
	}

	config(): void {
		this.router.use(authMiddleware);

    this.router.put('/edit',
      [
        check('name', 'The name is required').not().isEmpty(),
				check('name', 'The name must be at least 3 characters').isLength({ min: 3 }),
				check('name', 'The name must be a string').isString(),
				check('image', 'The image url is required').not().isEmpty(),
				check('image', 'The image url must be a string').isString(),
				check('country', 'The country is required').not().isEmpty(),
				check('country', 'The country must be a string').isString(),
				check('age', 'The age is required').not().isEmpty(),
				check('age', 'The age must be a number').isNumeric(),
				check('favoriteRecipe', 'The favorite recipe is required').not().isEmpty(),
				check('favoriteRecipe', 'The favorite recipe must be a string').isString(),
				check('favoriteRecipe', 'The favorite must be less than 100 characters').isLength({ max: 100 }),
        validateFields,
      ],
      usersController.editUser
    );

		this.router.put('/update-password',
			[
				check('password', 'The password is required').not().isEmpty(),
				check('password', 'The password must have at least 8 characters').isLength({ min: 8 }),
				validateFields
			],
			usersController.updatePassword
		);

    this.router.delete('/delete', usersController.deleteUser);
	}
}

export const usersRoutes = new UsersRoutes();
