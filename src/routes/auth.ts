import { Router } from 'express';
import { check } from 'express-validator';

import { authController } from '../controllers/AuthController';
import validate from '../middlewares/validate';

// TODO: Auth Middleware
class AuthRoutes {
  public router: Router = Router();

  constructor () {
    this.config();
  }

  config(): void {
    this.router.post('/login',
      [
        check('email', 'Email is required').not().isEmpty(),
        check('email', 'Email is not valid').isEmail(),
				check('password', 'The password is required').not().isEmpty(),
				check('password', 'The password must have at least 8 characters').isLength({ min: 8 }),
        validate,
      ],
      authController.login
    );

    this.router.post('/register', authController.register);

    this.router.get('/me', authController.getMe);
  }
}

export const authRoutes = new AuthRoutes();
