import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const url =  process.env.MONGO_URI ;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    return console.error('Error connecting to MongoDB::', error);
  }
};

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('Connection to MongoDB closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

export { connectDB, closeDB };
