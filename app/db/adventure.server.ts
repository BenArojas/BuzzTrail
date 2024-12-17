import { prisma } from "~/db.server";

export async function getAdventure(userId: string, id: string) {
  return prisma.adventure.findFirst({
    where: {
      id,
      userId: userId,
    },
  });
}

export async function getUserAdventures(userId: string) {
  return prisma.adventure.findMany({
    where: {
      userId: userId,
    },
  });
}
