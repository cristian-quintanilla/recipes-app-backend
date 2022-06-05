import mongoose from 'mongoose';

export const databaseConnection = async () => {
  try {
    await mongoose.connect(`${ process.env.DB_CONNECTION }`, {});
    console.log('Database connection successful');
  } catch (err) {
    console.log(err);
  }
};
