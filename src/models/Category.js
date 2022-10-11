const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  versionKey: false,
});

module.exports = model('Category', CategorySchema);
