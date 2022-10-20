import bcryptjs from 'bcryptjs';

import User from '../../models/User';
import generateJWT from '../../utils/generate-jwt';
import { errorName } from './../../constants';
import { validateToken } from '../../utils/validate-token';
import { AuthLoginInterface, CreateAccountInterface, DataStoredInToken } from '../../interfaces';

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
      }
    }

    const token = await generateJWT(payload);
    return { token, message: 'User created successfully', };
  } catch (err) {
    return new Error(errorName.SERVER_ERROR);
  };
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
      }
    }

    const token = await generateJWT(payload);
    return { token, message: 'Logged successfully', };
  } catch (_err) {
    return new Error(errorName.SERVER_ERROR);
  };
}

export const getLoggedUser = (context: any) => {
  const { authorization } = context.headers;
  const token = authorization.split(' ')[1];
  let id = null;

  // Validate token
  try {
    const userToken = validateToken(token);
    id = userToken?.user?._id;
  } catch (err) {
    return new Error(errorName.INVALID_TOKEN);
  }

  if (id) {
    const user = User.findById(id).select('_id name email imageUrl age favoriteRecipe');
    return user;
  } else {
    return new Error(errorName.USER_NOT_FOUND);
  }
}
