import mongoose, { model, Schema } from 'mongoose';

interface Category extends mongoose.Document {
  name: string;
  user: {
		_id: string;
		name: string;
    email: string;
	};
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
