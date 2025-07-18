// src/modules/auth/repositories/authRepository.ts

import prisma from "@/config/prisma";

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  isVerified?: boolean;
  registerToken?: string | null;
}

export async function createUser(data: CreateUserData) {
  return prisma.user.create({
    data: {
      ...data,
      isVerified: data.isVerified ?? false,
      registerToken: data.registerToken ?? null,
    },
  });
}

export async function updateIsVerified(id: number) {
  return prisma.user.update({
    where: { id },
    data: { isVerified: true, registerToken: null },
  });
}
export async function getUserRoleById(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
}
export async function updateUserPassword(userId: number, hashedPassword: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword, resetToken: null, resetTokenExpiration: null },
  });
}
export async function addResetTokenToUser(userId: number, token: string, expires: Date) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      resetToken: token,
      resetTokenExpiration: expires,
    },
  });
}
export async function findUserByResetToken(token: string) {
  return prisma.user.findFirst({
    where: { resetToken: token, resetTokenExpiration: { gte: new Date() } }, // revisar esto si esta comprobando que el dato no haya expirado.
  });
}
