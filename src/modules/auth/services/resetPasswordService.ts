//src/modules/auth/services/resetPasswordService.ts

import { findUserByResetToken, updateUserPassword } from "../repositories/authRepository";
import bcrypt from "bcrypt";

export default async function resetPasswordService(token: string, newPassword: string) {
  const user = await findUserByResetToken(token);
  if (!user) {
    throw { code: "USER_NOT_FOUND" };
  }
  const currentPassword: string = user.password;
  const passwordMatch = await bcrypt.compare(newPassword, currentPassword);
  if (passwordMatch) {
    throw { code: "INVALID_NEW_PASSWORD" };
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const userId: number = user.id;
  await updateUserPassword(userId, hashedPassword);
}
