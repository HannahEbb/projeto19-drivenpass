import cors from 'cors';
import dotenv from 'dotenv';
import express, { json } from 'express';
import 'express-async-errors';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import authRouter from './routes/authRouters';
import registerRouter from './routes/registerRouters';
dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(authRouter);
app.use(registerRouter);
app.use(errorHandlerMiddleware);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});