import { Router } from 'express';
import { check } from 'express-validator';

// TODO: Auth Middleware

import validateFields from '../middlewares/validate';
import { usersController } from '../controllers';

class UsersRoutes {
	public router: Router = Router();

	constructor() {
		this.config();
	}

	config(): void {
    this.router.put('/:id',
      [
				check('id').isMongoId().withMessage('Invalid ID: Must be a valid Mongo ID'),
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'Invalid email').isEmail(),
        validateFields,
      ],
      usersController.editUser
    );

		this.router.put('/update-password/:id',
			[
				check('id').isMongoId().withMessage('Invalid ID: Must be a valid Mongo ID'),
				check('password', 'The password is required').not().isEmpty(),
				check('password', 'The password must have at least 8 characters').isLength({ min: 8 }),
				validateFields
			],
			usersController.updatePassword
		);

		this.router.put('/update-image/:id',
			[
				check('id').isMongoId().withMessage('Invalid ID: Must be a valid Mongo ID'),
				check('image', 'The Image Url is required').not().isEmpty(),
				validateFields
			],
			usersController.updateImageUrl
		);

    this.router.delete('/:id', [
			check('id').isMongoId().withMessage('Invalid ID: Must be a valid Mongo ID'),
			validateFields
		], usersController.deleteUser);
	}
}

export const usersRoutes = new UsersRoutes();
