import findUserById from "../../../repository/findUserById";
import { updateIsVerified } from "../repositories/authRepository";

export async function verifyUserService({ id, token }: { id: number; token: string }) {
  const existingUser = await findUserById(id);
  if (!existingUser) {
    throw new Error("USER_NOT_FOUND");
  }
  if (existingUser.registerToken !== token) {
    throw new Error("INVALID_TOKEN");
  }
  // Actualizamos el estado de verificación del usuario
  await updateIsVerified(existingUser.id);

  return existingUser;
}
