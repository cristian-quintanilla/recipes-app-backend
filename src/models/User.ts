import mongoose, { Schema, model } from 'mongoose';

interface User extends mongoose.Document {
	name: string;
	email: string;
	password: string;
	imageUrl?: string;
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
    default: 'https://res.cloudinary.com/dnihaisdg/image/upload/v1655694955/RecipesApp/Users/user-profile_n1xpld.png'
  },
	age: {
		type: Number,
	},
	favoriteRecipe: {
		type: String,
	}
}, {
  versionKey: false,
});

export default model<User>('User', UserSchema);
