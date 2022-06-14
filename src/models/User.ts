import mongoose, { Schema, model } from 'mongoose';

export interface User extends mongoose.Document {
	name: string;
	email: string;
	password: string;
}

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
  imageUrl: {
    type: String,
    default: 'https://res.cloudinary.com/dnihaisdg/image/upload/v1655173003/RecipesApp/user-default-image_setj3q.png'
  }
}, {
  versionKey: false,
});


export default model<User>('User', UserSchema);
