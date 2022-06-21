import mongoose, { model, Schema } from 'mongoose';

import { User } from '../interfaces';

interface Category extends mongoose.Document {
  name: string;
  user: User;
}

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

export default model<Category>('Category', CategorySchema);
