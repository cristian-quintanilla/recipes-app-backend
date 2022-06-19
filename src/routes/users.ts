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
    this.router.put('/edit',
      [
        check('name', 'The name is required').not().isEmpty(),
				check('image', 'The Image Url is required').not().isEmpty(),
        validateFields,
      ],
			authMiddleware,
      usersController.editUser
    );

		this.router.put('/update-password',
			[
				check('password', 'The password is required').not().isEmpty(),
				check('password', 'The password must have at least 8 characters').isLength({ min: 8 }),
				validateFields
			],
			authMiddleware,
			usersController.updatePassword
		);

    this.router.delete('/delete', authMiddleware, usersController.deleteUser);
	}
}

export const usersRoutes = new UsersRoutes();
