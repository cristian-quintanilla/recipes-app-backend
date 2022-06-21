import { Request, Response } from 'express';

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
    console.log('create recipe');
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
