import { Prisma, User } from "@prisma/client";
import { prisma } from "~/db.server";

export async function addUser(user: Prisma.UserCreateInput) {
  return prisma.user.create({ data: user });
}

export async function authenticateCredentials(email: string, password: string) {
  return prisma.user.findFirst({ where: { email, password } });
}

export function findUser(id: string) {}

export function findUserByEmailPassword(email: string, password: string) {}

export function deleteUser(user: User) {}
