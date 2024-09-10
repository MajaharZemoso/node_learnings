import express from "express";
import dotenv from "dotenv";
import database from "./config/database";
import bodyParser from "body-parser";
import {
  DATABASE_SYNC,
  DATABASE_SYNC_ERROR,
  SERVICE_PORT,
} from "./utils/stringConstants/constants";
import {
  CASHKICK,
  CONTRACT,
  PAYMENT,
  USER,
} from "./utils/RouteConstants/routePaths";
import userRoutes from "./router/userRouter";
import paymentRoutes from "./router/paymentRouter";
import contractRoutes from "./router/contractRouter";
import cashkickRoutes from "./router/cashkickRouter";
import authRoutes from "./router/auth";
import { errorMiddleware } from "./exceptions/errorHandle";

dotenv.config();

// env variables
const port = process.env.APP_PORT || 4000;

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use(authRoutes);
app.use(USER, userRoutes);
app.use(PAYMENT, paymentRoutes);
app.use(CONTRACT, contractRoutes);
app.use(CASHKICK, cashkickRoutes);

// error handlers
app.use(errorMiddleware);

// Database synchronization
database
  .sync()
  .then(() => {
    console.log(DATABASE_SYNC);
  })
  .catch((err) => {
    console.error(DATABASE_SYNC_ERROR, err);
  });

// Start server
app.listen(port, () => {
  console.log(SERVICE_PORT, port);
});
