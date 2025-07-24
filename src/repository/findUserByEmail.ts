//src/repository/findUserByEmail.ts

import prisma from "@/config/prisma";

export default async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}
