import bcryptjs from 'bcryptjs';

import User from '../../models/User';
import generateJWT from '../../utils/generate-jwt';
import { errorName } from './../../constants';
import { validateToken } from '../../utils/validate-token';

import {
  AuthLoginInterface,
  CreateAccountInterface,
  DataStoredInToken,
  UpdateAccountInterface,
} from '../../interfaces';

export const register = async ({ email, name, password }: CreateAccountInterface) => {
  try {
    // Check if the Email already exists
    let user = await User.findOne({ email });

    if (user) {
      return new Error(errorName.EMAIL_IN_USE);
    }

    // Encrypt the password
    const salt = await bcryptjs.genSalt();
    const newPassword = await bcryptjs.hash(password, salt);

    // Create the user
    user = await User.create({ name, email, password: newPassword });

    const payload: DataStoredInToken = {
      user: {
        _id: user._id,
        name,
        email,
      },
    };

    const token = await generateJWT(payload);
    return { token, message: 'User created successfully' };
  } catch (err) {
    return new Error(errorName.SERVER_ERROR);
  }
};

export const login = async ({ email, password }: AuthLoginInterface) => {
  try {
    // Check if the Email already exists
    let user = await User.findOne({ email });

    if (!user) {
      return new Error(errorName.USER_NOT_FOUND);
    }

    // Verify if the password is correct
    const passwordCorrect = await bcryptjs.compare(password, user.password);
    if (!passwordCorrect) {
      return new Error(errorName.WRONG_PASSWORD);
    }

    // Create and assign a token
    const payload: DataStoredInToken = {
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    const token = await generateJWT(payload);
    return { token, message: 'Logged in successfully' };
  } catch (_err) {
    return new Error(errorName.SERVER_ERROR);
  }
};

export const getLoggedUser = async (context: any) => {
  const { authorization } = context.headers;
  let id = null;

  if (!authorization) {
    return new Error(errorName.INVALID_TOKEN);
  }

  // Validate token
  try {
    const token = authorization.split(' ')[1];
    const userToken = validateToken(token);
    id = userToken?.user?._id;
  } catch (err) {
    return new Error(errorName.INVALID_TOKEN);
  }

  if (id) {
    const user = await User.findById(id);
    return user;
  } else {
    return new Error(errorName.USER_NOT_FOUND);
  }
};

export const getProfile = async ({ _id }: any) => {
  try {
    const user = await User.findById('634e14718e2d1d8bd4ad9f15');

    if (user) return user;
    return new Error(errorName.USER_NOT_FOUND);
  } catch (err) {
    return new Error(errorName.USER_NOT_FOUND);
  }
};

export const editUser = async (context: any, args: UpdateAccountInterface) => {
  const { authorization } = context.headers;
  let id = null;

  if (!authorization) {
    return new Error(errorName.INVALID_TOKEN);
  }

  // Validate token
  try {
    const token = authorization.split(' ')[1];
    const userToken = validateToken(token);
    id = userToken?.user?._id;
  } catch (err) {
    return new Error(errorName.INVALID_TOKEN);
  }

  // Validate user
  if (id) {
    const user = await User.findById(id);

    if (!user) {
      return new Error(errorName.USER_NOT_FOUND);
    }

    // Update user if was found
    const { name, age, favoriteRecipe, imageUrl } = args;

    try {
      const user = await User.findByIdAndUpdate(id, {
        name,
        age,
        favoriteRecipe,
        imageUrl,
      }, { new: true });

      return user;
    } catch (err) {
      return new Error(errorName.USER_UPDATE);
    }
  } else {
    return new Error(errorName.USER_NOT_FOUND);
  }
};
