import bcryptjs from 'bcryptjs';

import User from '../../models/User';
import generateJWT from '../../utils/generate-jwt';
import { CreateAccountInterface, DataStoredInToken } from '../../interfaces';

export const register = async ({ email, name, password }: CreateAccountInterface) => {
  // Check if the Email already exists
  const user = await User.findOne({ email });

  if (user) {
    return { token: null, message: 'E-mail already in use', };
  }

  // Encrypt the password
  const salt = await bcryptjs.genSalt();
  const newPassword = await bcryptjs.hash(password, salt);

  // Create the user
  try {
    const user = await User.create({ name, email, password: newPassword });

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
