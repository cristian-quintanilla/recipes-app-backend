import { Request } from 'express';

export interface DataStoredInToken {
	user?: {
		_id: string;
		name: string;
    email: string;
	}
}

export interface CreateAccountInterface {
  name: string;
  email: string;
  password: string;
}

export interface UpdateAccountInterface {
	name: string;
	imageUrl?: string;
	age?: number;
	favoriteRecipe?: string;
}

export interface AuthLoginInterface {
  email: string;
  password: string;
}

export interface User {
	_id?: string;
  name: string;
	email: string;
	password?: string;
	age?: string;
	favoriteRecipe?: string;
	imageUrl?: string;
}

export interface Category {
	_id: string;
	name: string;
}

export interface Ingredient {
	name: string;
}

export interface Step {
	step: number;
	description: string;
}

export interface Recipe {
	_id: string;
	name: string;
  description: string;
  timePreparation: string;
  timeCooking: string;
  servings: number;
  ingredients: string[];
  steps: string[];
  imageUrl?: string;
  category: Category;
  user: User;
  commentsCount?: number;
  likesCount?: number;
}

export interface Comment {
	_id?: string;
	date?: Date;
	comment: string;
	user: string;
}

export interface Like {
	_id?: string;
	date?: Date;
  user: string;
}
