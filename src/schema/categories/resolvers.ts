import Category from '../../models/Category';
import { errorName } from '../../constants';

export const newCategory = async ({ name }: { name: string }) => {
  try {
    const category = await Category.create({ name });
    return category;
  } catch (err) {
    return new Error(errorName.SERVER_ERROR);
  }
}

export const getCategories = async () => {
  try {
    const categories = await Category.find({});
    return categories;
  } catch (err) {
    return new Error(errorName.CATEGORIES_ERROR);
  }
}
