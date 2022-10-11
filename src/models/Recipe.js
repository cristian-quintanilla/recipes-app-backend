const mongoose = require('mongoose');
const { Schema, model } = mongoose;

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
  comments: [{
    comment: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    },
  }],
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    },
  }]
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = model('Recipe', RecipeSchema);
