import { redirect } from "@remix-run/node";
import { authCookie } from "~/sessions/auth";

export async function action() {
  return redirect("/login", {
    headers: {
      "Set-Cookie": await authCookie.serialize("", {
        maxAge: 0,
      }),
    },
  });
}
