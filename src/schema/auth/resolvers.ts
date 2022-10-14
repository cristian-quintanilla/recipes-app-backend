import bcryptjs from 'bcryptjs';

import User from '../../models/User';
import generateJWT from '../../utils/generate-jwt';
import { AuthLoginInterface, CreateAccountInterface, DataStoredInToken } from '../../interfaces';

export const register = async ({ email, name, password }: CreateAccountInterface) => {
  try {
    // Check if the Email already exists
    let user = await User.findOne({ email });

    if (user) {
      return { token: null, message: 'E-mail already in use', };
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
  } catch (_err) {
    return { token: null, message: 'Error creating the user', };
  };
};

export const login = async ({ email, password }: AuthLoginInterface) => {
  try {
    // Check if the Email already exists
    let user = await User.findOne({ email });

    if (!user) {
      return { token: null, message: 'User not found', };
    }

    // Verify if the password is correct
    const passwordCorrect = await bcryptjs.compare(password, user.password);
    if (!passwordCorrect) {
      return { token: null, message: 'Wrong password', };
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
    return { token: null, message: 'Error creating the user', };
  };
}
