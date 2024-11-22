import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './database';
import router from './routes/AdminRoutes';
dotenv.config();

const app = express();
app.use(express.json());
// Use the AdminRoutes for all routes under '/api'
app.use('/api', router); // Prefix routes with '/api'
connectDB();

app.listen(process.env.PORT, () =>
  console.log(`Listening on ${process.env.PORT}`)
);
