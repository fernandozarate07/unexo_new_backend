import findUserByEmail from "@/repository/findUserByEmail";
import { addResetTokenToUser } from "../repositories/authRepository";
import { sendResetPasswordEmail } from "./authMailService";
import crypto from "crypto";

export default async function forgotPasswordService(email: string): Promise<void> {
  const user = await findUserByEmail(email);
  if (!user) {
    throw { code: "USER_NOT_FOUND" };
  }

  // Generar un token de restablecimiento y una fecha de expiración
  const rawToken = crypto.randomBytes(32).toString("hex"); // Token para restablecimiento
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

  //Actualizar el usuario con el token y la expiración
  await addResetTokenToUser(user.id, rawToken, expires);

  //Crear el enlace de restablecimiento
  const resetLink = `${process.env.FRONTEND_URL}/api/auth/password/reset?token=${rawToken}`;

  //Consumir el servicio de correo para enviar el enlace de restablecimiento
  await sendResetPasswordEmail(email, resetLink);
}
