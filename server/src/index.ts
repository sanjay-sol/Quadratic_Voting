import express, { Request, Response } from 'express';
import { connectDB } from './config/connection';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT: number = 3000;

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      return console.error('Missing MONGO_URI!!!');
    }
    
    await connectDB();
    console.log("Connected to MongoDB");

    app.get('/', (req: Request, res: Response) => {
      res.send('Hello, Express with TypeScript!');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

startServer();
