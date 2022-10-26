import mongoose, { model, Schema } from 'mongoose';

interface Category extends mongoose.Document {
  name: string;
}

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  versionKey: false,
});

export default model<Category>('Category', CategorySchema);
