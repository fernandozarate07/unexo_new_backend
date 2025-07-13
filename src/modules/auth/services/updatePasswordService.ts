import bcrypt from "bcrypt";
import findUserById from "@/repository/findUserById";
import { updateUserPassword } from "../repositories/authRepository";

interface UpdatePasswordDTO {
  currentPassword: string;
  newPassword: string;
  userId: number;
}

export default async function updatePasswordService({
  currentPassword,
  newPassword,
  userId,
}: UpdatePasswordDTO): Promise<void> {
  const user = await findUserById(userId);

  if (!user) {
    throw { code: "USER_NOT_FOUND" };
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw { code: "INVALID_CURRENT_PASSWORD" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(userId, hashedPassword);
}
