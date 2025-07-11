import prisma from "@/config/prisma";

export default async function findUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
  });
}
