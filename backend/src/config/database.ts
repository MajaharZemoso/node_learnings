import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Dialect } from "sequelize";
import User from "../model/user";
import Cashkick from "../model/cashkick";
import Payment from "../model/payment";
import Contract from "../model/contract";
import CashKickHasContracts from "../model/cashkickHasContracts";

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.DB_PASSWORD;

const database: Sequelize = new Sequelize({
  database: dbName,
  dialect: dbDriver,
  username: dbUser,
  password: dbPassword,
  storage: ":memory:",
  models: [User, Cashkick, Payment, Contract, CashKickHasContracts],
});

export default database;
