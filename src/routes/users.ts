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
        check('name', 'El nombre es requerido').not().isEmpty(),
				check('name', 'El nombre debe de tener al menos 3 caracteres').isLength({ min: 3 }),
				check('image', 'El URL de la imagen es requerida').not().isEmpty(),
				check('country', 'El país es requerido').not().isEmpty(),
				check('age', 'La edad es requerida').not().isEmpty(),
				check('age', 'La edad debe de ser un número').isNumeric(),
				check('favoriteRecipe', 'La receta favorita es requerida').not().isEmpty(),
				check('favoriteRecipe', 'La receta favorita debe de tener menos de 100 caracteres').isLength({ max: 100 }),
        validateFields,
      ],
      usersController.editUser
    );

		this.router.put('/update-password',
			[
        check('password', 'La contraseña es requerida').not().isEmpty(),
        check('password', 'La contraseña debe de tener al menos 8 caracteres').isLength({ min: 8 }),
				validateFields
			],
			usersController.updatePassword
		);

    this.router.delete('/delete', usersController.deleteUser);
	}
}

export const usersRoutes = new UsersRoutes();
