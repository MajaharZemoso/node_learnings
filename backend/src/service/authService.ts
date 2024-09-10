import User from "../model/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET_KEY } from "../utils/stringConstants/constants";

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return { success: false, message: "Invalid email or password" };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return { success: false, message: "Invalid email or password" };
      }

      const token = jwt.sign(
        { userId: user.dataValues.id, email: user.dataValues.email },
        JWT_SECRET_KEY,
        { expiresIn: "5m" }
      );

      return { success: true, token };
    } catch (err) {
      console.error(`Error while logging in: ${err}`);
      throw new Error("Error while logging in");
    }
  },
};
