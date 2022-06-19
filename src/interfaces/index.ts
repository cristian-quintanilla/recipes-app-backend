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
  name: string;
	email: string;
	password: string;
}
