// mongodb+srv://admin:admin@cluster0.cqdjidf.mongodb.net/?retryWrites=true&w=majority
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import roomsRouter from './routes/rooms.js';
import usersRouter from './routes/users.js';
import hotelsRouter from './routes/hotels.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT ?? 5004;
const MONGO_URI = process.env.MONGO ?? '';

// middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/users', usersRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.errorStatus || 500;
  const errorMessage = err.message || 'Something went wrong';

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DataBase!');
  } catch (error) {
    throw new Error();
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('mongoDb disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('mongoDb connected');
});

app.listen(PORT, () => {
  connect();
  console.log(`Server started on port ${PORT}`);
});
