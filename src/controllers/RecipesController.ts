import { Request, Response } from 'express';

import RecipeModel from '../models/Recipe';
import validateCategory from '../utils/validate-category';
import validateRecipe from '../utils/validate-recipe';
import { getUser } from '../middlewares/auth';
import { RequestWithUser } from '../interfaces';

class RecipesController {
  public async getRecipes(req: Request, res: Response) {
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    try {
      const recipes = await validateRecipe(user?._id || '');
      return res.status(200).json({
        ok: true,
        recipes,
      });
    } catch (err: any) {
      res.status(500).json({
        ok: false,
        msg: err
      });
    }
  }

  public async getRecipe(req: Request, res: Response) {
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);

    try {
      const { id } = req.params;
      const recipe = await validateRecipe(user?._id || '', id);

      if (!recipe) {
        return res.status(404).json({ ok: false, msg: 'Recipe not found' });
      }

      return res.status(200).json({
        ok: true,
        recipe,
      });
    } catch (err: any) {
      res.status(500).json({
        ok: false,
        msg: err
      });
    }
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

    const category = await validateCategory(user?._id || '', categoryId);

    if (!category) {
      return res.status(404).json({ ok: false, msg: 'Category not found' });
    }

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
    const recipe = await validateRecipe(user?._id || '', id);

    if (!recipe) {
      return res.status(404).json({ ok: false, msg: 'Recipe not found' });
    } else {
      const category = await validateCategory(user?._id || '', categoryId);

      if (!category) {
        return res.status(404).json({ ok: false, msg: 'Category not found' });
      }

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

    try {
      const { id } = req.params;
      const recipe = await validateRecipe(user?._id || '', id);

      if (!recipe) {
        return res.status(404).json({ ok: false, msg: 'Recipe not found' });
      }

      // Delete Recipe
      RecipeModel.findByIdAndDelete(id).exec().then(() => {
        res.status(200).json({
          ok: true,
          msg: 'Recipe deleted successfully',
        });
      });
    } catch (err: any) {
      res.status(500).json({
        ok: false,
        msg: err
      });
    }
  }

  public async deleteRecipesByUser(userId: string) {
    return RecipeModel.deleteMany({ user: userId }).exec();
  }

  public async addComment(req: Request, res: Response) {
    const userRequest: RequestWithUser = req as RequestWithUser;
    const user = getUser(userRequest, res);
    const { id } = req.params;
    const { comment } = req.body;

    if (comment.length > 250) {
      return res.status(400).json({
        ok: false,
        msg: 'Comment must be less than 250 characters'
      });
    }

    RecipeModel.findById(id).exec().then(recipe => {
      if (!recipe) {
        return res.status(404).json({ ok: false, msg: 'Recipe not found' });
      }

      recipe.comments.push({
        user: user?._id!,
        comment,
      });

      recipe.save();

      return res.status(200).json({
        ok: true,
        msg: 'Comment added successfully',
      });
    }).catch(err => {
      return res.status(500).json({
        ok: false,
        msg: err
      });
    });
  }

  //* Public Methods (No Auth)
  public async getAllRecipes(req: Request, res: Response) {
    try {
			const { page, size, search } = req.query;

      let filters = search ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ]
      } : {};

      const recipes = await RecipeModel.find(filters, 'name description imageUrl servings')
      .limit(Number(size))
      .skip((Number(page) - 1) * Number(size))
      .populate([
        { path: 'category', select: 'name' },
        { path: 'user', select: 'name email' }
      ]).sort({ createdAt: -1 });

      return res.status(200).json({
				totalPages: Math.ceil(recipes.length / Number(size)),
				currentPage: Number(page),
        ok: true,
				recipes,
			});
		} catch (err) {
			res.status(500).json({ ok: false, msg: 'Error while getting recipes' });
		}
  }

  public async getOneRecipe(req: Request, res: Response) {
    const { id } = req.params;

    RecipeModel.findById(id).populate([
      { path: 'category', select: 'name' },
      { path: 'user', select: 'name email' },
      { path: 'comments.user', select: 'name' }
    ]).exec().then(recipe => {
      if (!recipe) {
        return res.status(404).json({ ok: false, msg: 'Recipe not found' });
      }

      return res.status(200).json({
        ok: true,
        recipe,
      });
    }).catch(err => {
      return res.status(500).json({
        ok: false,
        msg: err
      });
    });
  }
}

export const recipesController = new RecipesController();
