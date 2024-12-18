import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction,
  } from "@remix-run/node";
  import { data, Form, redirect, useActionData } from "@remix-run/react";
  import { useState } from "react";
  import { addUser, authenticateCredentials } from "~/db/users.server";
  import { requireAnonymous } from "~/auth/auth";
  import { authCookie } from "~/sessions/auth";
  
  export const meta: MetaFunction = () => {
    return [
      { title: "New Remix App" },
      { name: "description", content: "Welcome to Remix!" },
    ];
  };
  
  export async function loader({ request }: LoaderFunctionArgs) {
    await requireAnonymous(request);
    return {};
  }
  
  export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
  
    const { _action, ...rest } = Object.fromEntries(formData) as Record<
      string,
      string
    >;
    switch (_action) {
      case "register": {
        const { name, email, password } = rest;
        if (!name || !email || !password) {
          return data({ error: "All fields are required" }, { status: 400 });
        }
        try {
          const user = await addUser({ email, password, name });
          return redirect("/", {
            headers: {
              "Set-Cookie": await authCookie.serialize(user.id),
            },
          });
        } catch (error) {
          return data(
            { error: "Email already used. please use different email" },
            { status: 400 }
          );
        }
      }
      case "login": {
        const { email, password } = rest;
        const user = await authenticateCredentials(email, password);
        if (!user) {
          return data({ error: "Invalid credentials" }, { status: 400 });
        }
        return redirect("/", {
          headers: {
            "Set-Cookie": await authCookie.serialize(user.id),
          },
        });
      }
      default:
        return data({ error: "Invalid action" }, { status: 400 });
    }
  }
  
  export default function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const actionData = useActionData<typeof action>();
  
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-500 to-black">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
          <Form method="post" className="space-y-6 mt-6">
            {isRegister && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
  
            {actionData?.error && (
              <p className="text-red-500">{`${actionData.error}`}</p>
            )}
            <button
              type="submit"
              value={isRegister ? "register" : "login"}
              name="_action"
              className="w-full bg-black hover:bg-yellow-300 hover:text-black text-white font-bold py-2 px-4 rounded-lg"
            >
              {isRegister ? "Register" : "Login"}
            </button>
          </Form>
          {isRegister ? (
            <p className="text-center text-gray-600 mt-4">
              Already have an account?
              <br />
              <b className="cursor-pointer" onClick={() => setIsRegister(false)}>Login</b>
            </p>
          ) : (
            <p className="text-center text-gray-600 mt-4">
              Don't have an account?
              <br />
              <b className="cursor-pointer" onClick={() => setIsRegister(true)}>Sign up</b>
            </p>
          )}
        </div>
      </div>
    );
  }
  