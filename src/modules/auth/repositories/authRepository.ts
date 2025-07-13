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
export async function getUserRoleById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: { role: true },
  });
}
export async function updateUserPassword(userId: number, hashedPassword: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
}
