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
        check('email', 'Email is required').not().isEmpty(),
        check('email', 'Email is not valid').isEmail(),
				check('password', 'The password is required').not().isEmpty(),
				check('password', 'The password must have at least 8 characters').isLength({ min: 8 }),
        validateFields,
      ],
      authController.login
    );

    this.router.post('/register',
      [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        check('password', 'The password must have at least 8 characters').isLength({ min: 8 }),
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
        check('id', 'Invalid Mongo ID').isMongoId(),
        validateFields,
      ],
      authController.getProfile
    );
  }
}

export const authRoutes = new AuthRoutes();
