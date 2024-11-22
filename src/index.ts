import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './database';
dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.listen(process.env.PORT, () =>
  console.log(`Listening on ${process.env.PORT}`)
);
