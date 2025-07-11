// src/modules/auth/services/registerService.ts
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendWelcomeEmail } from "./authMailService";
import { createUser } from "../repositories/authRepository";
import findUserByEmail from "@/repository/findUserByEmail";

interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

export async function registerUserService({ name, email, password }: RegisterUserPayload) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_USED");
  }

  // Hasheamos la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Token de verificación para el registro
  const registerToken = crypto.randomBytes(32).toString("hex");

  const newUser = await createUser({
    name,
    email,
    password: hashedPassword,
    isVerified: false,
    registerToken,
  });

  const verifyLink = `${process.env.FRONTEND_URL}/api/auth/register/verify?id=${newUser.id}&token=${registerToken}`;

  await sendWelcomeEmail(email, verifyLink);

  return newUser;
}
