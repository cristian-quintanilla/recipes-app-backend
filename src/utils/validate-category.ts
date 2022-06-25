import CategoryModel from '../models/Category';

async function validateCategory(userId: string, categoryId?: string) {
  if (categoryId) {
    return await CategoryModel.findById(categoryId).where('user').equals(userId).populate({
      path: 'user',
      select: '_id name email'
    }).exec();
  } else {
    return await CategoryModel.find({ user: userId }).where('user').equals(userId).populate({
      path: 'user',
      select: '_id name email'
    }).exec();
  }
}

export default validateCategory;
