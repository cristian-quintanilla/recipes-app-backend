import { Router } from 'express';
import { check } from 'express-validator';

import validateFields from '../middlewares/validate';
import { authMiddleware } from '../middlewares/auth';
import { authController } from '../controllers/AuthController';

class AuthRoutes {
  public router: Router = Router();

  constructor () {
    this.config();
  }

  config(): void {
    this.router.post('/login',
      [
        check('email', 'El correo electrónico es requerido').not().isEmpty(),
        check('email', 'Correo electrónico no válido').isEmail(),
				check('password', 'La contraseña es requerida').not().isEmpty(),
				check('password', 'La contraseña debe de tener al menos 8 caracteres').isLength({ min: 8 }),
        validateFields,
      ],
      authController.login
    );

    this.router.post('/register',
      [
        check('name', 'El nombre es requerido').not().isEmpty(),
				check('name', 'El nombre debe de tener al menos 3 caracteres').isLength({ min: 3 }),
        check('email', 'El correo electrónico es requerido').not().isEmpty(),
        check('email', 'Correo electrónico no válido').isEmail(),
        check('password', 'La contraseña es requerida').not().isEmpty(),
        check('password', 'La contraseña debe de tener al menos 8 caracteres').isLength({ min: 8 }),
        validateFields,
      ],
      authController.register
    );

    this.router.get('/me',
      authMiddleware,
      authController.getMe
    );

    this.router.get('/profile/:id',
      [
        check('id', 'El ID es requerido').not().isEmpty(),
        check('id', 'ID no válido').isMongoId(),
        validateFields,
      ],
      authController.getProfile
    );
  }
}

export const authRoutes = new AuthRoutes();
