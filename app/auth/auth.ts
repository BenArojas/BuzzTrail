import { redirect } from "@remix-run/node";
import { prisma } from "~/db.server";
import { authCookie } from "~/sessions/auth";

export async function requireUser(request: Request) {
  const cookieString = request.headers.get("Cookie");
  const userId = await authCookie.parse(cookieString);
  if (!userId) {
    throw redirect("/login");
  }
  return prisma.user.findFirst({ where: { id: userId } });
}
export async function requireAnonymous(request: Request) {
  const cookieString = request.headers.get("Cookie");
  const userId = await authCookie.parse(cookieString);
  if (userId) {
    throw redirect("/");
  }
}
