const { Schema, model } = require('mongoose');

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
	country: {
		type: String,
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

module.exports = model('User', UserSchema)
