import { Request, Response } from 'express';

import CategoryModel from '../models/Category';
import RecipeModel from '../models/Recipe';
import { getUser } from '../middlewares/auth';
import { RequestWithUser } from '../interfaces';

class RecipesController {
  public async getRecipes(req: Request, res: Response) {
    console.log('get recipes');
  }

  public async getRecipe(req: Request, res: Response) {
    console.log('get recipe');
  }

  public async createRecipe(req: Request, res: Response) {
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    const {
      name,
      description,
      timePreparation,
      timeCooking,
      servings,
      ingredients,
      steps,
      imageUrl,
      categoryId,
    } = req.body;

    // Validate if the user is the owner of the category
    CategoryModel.findById(categoryId).populate({
      path: 'user',
      select: '_id name email'
    }).exec().then(category => {
      // Category does not exist
      if (!category) {
        return res.status(404).json({ ok: false, msg: 'Category not found' });
      }

      if (category?.user._id.toString() !== user?._id) {
        return res.status(403).json({ ok: false, msg: 'Forbidden' });
      }

      // Check if the user is the owner of the category
      if (category?.user._id.toString() === user?._id) {
        RecipeModel.create({
          name,
          description,
          timePreparation,
          timeCooking,
          servings,
          ingredients,
          steps,
          imageUrl,
          category: categoryId,
          user: user?._id
        }).then(recipe => {
          res.status(201).json({
            ok: true,
            recipe,
          });
        }).catch(err => {
          res.status(500).json({
            ok: false,
            msg: err.message
          });
        });
      }
    });
  }

  public async updateRecipe(req: Request, res: Response) {
    console.log('update recipe');
  }

  public async deleteRecipe(req: Request, res: Response) {
    console.log('delete recipe');
  }

  public async deleteRecipesByUser(userId: string) {
    return RecipeModel.deleteMany({ user: userId }).exec();
  }
}

export const recipesController = new RecipesController();
