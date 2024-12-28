import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getAdventure(userId: string, id: string) {
  return prisma.adventure.findFirst({
    where: {
      id,
      userId: userId,
    },
    include: {
      items: true
    }
  });
}

export async function getUserAdventures(userId: string) {
  return prisma.adventure.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function createAdventure(
  userId: string,
  data: Prisma.AdventureCreateWithoutUserInput
) {
  return prisma.adventure.create({
    data: { ...data, userId: userId },
  });
}

export async function getNextAdventures(userId: string) {
  return prisma.adventure.findMany({
    where: {
      userId: userId,
      startDate: {
        gt: new Date(),
      },
    },
    orderBy: {
      startDate: 'asc',
    },
  });
}


export async function getPreviousAdventures(userId: string) {
  return prisma.adventure.findMany({
    where: {
      userId: userId,
      startDate: {
        lt: new Date()
      },
    },
  });
}

export async function getCompletedAdventures(userId: string) {
  return prisma.adventure.findMany({
    where: {
      userId: userId,
      status: "COMPLETED"
    },
  });
}

export async function checkForOverlappingAdventures(userId: string, startDate: Date, endDate: Date) {
  return prisma.adventure.findFirst({
    where: {
      userId,
      OR: [
        // Case 1: New adventure starts during an existing adventure
        {
          startDate: { lte: startDate },
          endDate: { gte: startDate }
        },
        // Case 2: New adventure ends during an existing adventure
        {
          startDate: { lte: endDate },
          endDate: { gte: endDate }
        },
        // Case 3: New adventure completely contains an existing adventure
        {
          startDate: { gte: startDate },
          endDate: { lte: endDate }
        }
      ]
    }
  });
}