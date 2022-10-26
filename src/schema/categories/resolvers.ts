import Category from '../../models/Category';
import { errorName } from '../../constants';

export const newCategory = async ({ name }: { name: string }) => {
  try {
    // Create the user
    const category = await Category.create({ name });
    return category;
  } catch (err) {
    return new Error(errorName.SERVER_ERROR);
  }
}
