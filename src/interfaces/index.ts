import { Request } from 'express';

export interface DataStoredInToken {
	user?: {
		_id: string;
		name: string;
    email: string;
	}
}

export interface RequestWithUser extends Request {
	user?: {
		_id: string;
		name: string;
    email: string;
	},
}

export interface User {
	_id?: string;
  name: string;
	email: string;
	password?: string;
}

export interface Category {
	_id: string;
	name: string;
  user: User;
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
}

export interface Comment {
	_id?: string;
	date?: Date;
	comment: string;
	user: string;
}
