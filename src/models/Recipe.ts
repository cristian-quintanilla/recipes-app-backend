import mongoose, { model, Schema } from 'mongoose';

import { Category, Ingredient, Step, User } from '../interfaces';

interface Recipe extends mongoose.Document {
  name: string;
  description: string;
  timePreparation: string;
  timeCooking: string;
  servings: number;
  ingredients: Ingredient[];
  steps: Step[];
  imageUrl?: string;
  category: Category;
  user: User;
}

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  timePreparation: {
    type: String,
    required: true,
    trim: true,
  },
  timeCooking: {
    type: String,
    required: true,
    trim: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  ingredients: [{
    quantity: String,
    name: String,
  }],
  steps: [{
    step: Number,
    description: String,
  }],
  imageUrl: {
    type: String,
    default: 'https://res.cloudinary.com/dnihaisdg/image/upload/v1655778144/RecipesApp/Recipes/default-recipe_pfodwr.jpg'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true,
  versionKey: false,
});

export default model<Recipe>('Recipe', RecipeSchema);
