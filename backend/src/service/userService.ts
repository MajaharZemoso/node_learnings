import { UserAlreadyExist } from "../exceptions/userAlreadyExist";
import Cashkick from "../model/cashkick";
import Payment from "../model/payment";
import User from "../model/user";
import {
  CASHKICK_ATTRIBUTES,
  PAYMENT_ATTRIBUTES,
  USER_MESSAGES,
} from "../utils/stringConstants/constants";
import { IUser } from "../interface/interface";
import bcrypt from "bcrypt";
import { validateAndUpdatePassword } from "../utils/helperFunctions/helper";

export const userService = {
  createUser: async (userData: IUser) => {
    try {
      const existingUser = await User.findOne({
        where: { email: userData.email },
      });
      if (existingUser) {
        throw new UserAlreadyExist(USER_MESSAGES.EMAIL_EXIST);
      }
      const { name, email, password, credit_balance } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        credit_balance: credit_balance,
      });
      return newUser;
    } catch (error) {
      if (error instanceof UserAlreadyExist) {
        throw error;
      } else {
        throw new Error(USER_MESSAGES.ERROR_ADD + error);
      }
    }
  },

  getUserByEmail: async (email: string) => {
    try {
      const user = await User.findOne({
        where: { email },
        include: [
          {
            model: Cashkick,
            attributes: CASHKICK_ATTRIBUTES,
          },
          {
            model: Payment,
            attributes: PAYMENT_ATTRIBUTES,
          },
        ],
      });
      return user;
    } catch (error) {
      throw new Error(USER_MESSAGES.ERROR_FETCH + error);
    }
  },
  updateUser: async (userId: number, updates: Partial<IUser>) => {
    try {
      const existingUser = await User.findByPk(userId);
      if (!existingUser) {
        throw new Error(USER_MESSAGES.NOT_FOUND);
      }

      const updatedFields: Partial<IUser> = {};

      if (updates.password !== undefined) {
        await validateAndUpdatePassword(existingUser, updates.password);
        updatedFields.password = await bcrypt.hash(updates.password, 10);
      }

      if (updates.credit_balance !== undefined) {
        updatedFields.credit_balance = updates.credit_balance;
      }

      const updatedUser = await existingUser.update(updatedFields);

      return updatedUser;
    } catch (error) {
      throw new Error(USER_MESSAGES.ERROR_UPDATE + error);
    }
  },
};
