import { Request, Response } from 'express';

import RecipeModel from '../models/Recipe';
import { categoriesController } from './CategoriesController';
import { getUser } from '../middlewares/auth';
import { RequestWithUser } from '../interfaces';

class RecipesController {
  public async getRecipes(req: Request, res: Response) {
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    RecipeModel.find({ user: user?._id }).populate([
      {
        path: 'category',
        select: 'name'
      },
      {
        path: 'user',
        select: 'name email'
      }
    ]).exec().then(recipes => {
      res.status(200).json({
        ok: true,
        recipes,
      });
    }).catch(err => {
      res.status(500).json({
        ok: false,
        msg: err.message
      });
    });
  }

  public async getRecipe(req: Request, res: Response) {
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    const { id } = req.params;

    // TODO: Refactor this
    RecipeModel.findById(id).populate([
      {
        path: 'category',
        select: 'name'
      },
      {
        path: 'user',
        select: 'name email'
      }
    ]).exec().then(recipe => {
      if (recipe?.user._id.toString() !== user?._id) {
        return res.status(403).json({ ok: false, msg: 'Forbidden' });
      }

      if (!recipe) {
        return res.status(404).json({ ok: false, msg: 'Recipe not found' });
      }

      res.status(200).json({
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

    const isOwner = await categoriesController.validateCategory(categoryId, user?._id || '');

    if (!isOwner) {
      return res.status(403).json({ ok: false, msg: 'Forbidden' });
    } else {
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
        return res.status(201).json({
          ok: true,
          msg: 'Recipe created successfully',
          recipe,
        });
      }).catch(err => {
        return res.status(500).json({
          ok: false,
          msg: err.message
        });
      });
    }
  }

  public async updateRecipe(req: Request, res: Response) {
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

    const { id } = req.params;

    const isOwner = await categoriesController.validateCategory(categoryId, user?._id || '');

    if (!isOwner) {
      return res.status(403).json({ ok: false, msg: 'Forbidden' });
    } else {
      RecipeModel.findByIdAndUpdate(id, {
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
      }, { new: true }).exec().then(recipe => {
        return res.status(200).json({
          ok: true,
          msg: 'Recipe updated successfully',
          recipe,
        });
      }).catch(err => {
        return res.status(500).json({
          ok: false,
          msg: err.message
        });
      });
    }
  }

  public async deleteRecipe(req: Request, res: Response) {
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);
    const { id } = req.params;

    // TODO: Refactor this
    RecipeModel.findById(id).populate([
      { path: 'category', select: 'name' },
      { path: 'user', select: 'name email' }
    ]).exec().then(recipe => {
      if (!recipe) {
        return res.status(404).json({ ok: false, msg: 'Recipe not found' });
      }

      if (recipe?.user._id.toString() !== user?._id) {
        return res.status(403).json({ ok: false, msg: 'Forbidden' });
      }

      // Delete Recipe
      RecipeModel.findByIdAndDelete(id).exec().then(() => {
        res.status(200).json({
          ok: true,
          msg: 'Recipe deleted successfully',
        });
      });
    }).catch(err => {
      res.status(500).json({
        ok: false,
        msg: err.message
      });
    });
  }

  public async deleteRecipesByUser(userId: string) {
    return RecipeModel.deleteMany({ user: userId }).exec();
  }
}

export const recipesController = new RecipesController();
