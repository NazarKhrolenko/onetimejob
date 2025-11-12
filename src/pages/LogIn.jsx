import React, { useState } from "react";
import {
  useSearchParams,
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedin", true);
    return redirect("/process/profile");
  } catch (err) {
    return err.message;
  }
}

const LogIn = () => {
  const message = useLoaderData();
  return (
    <div className="h-screen w-full flex justify-center flex-col items-center">
      <h1 className="text-3xl font-semibold pb-8">Sign in to your account</h1>
      {message && <h3 className="text-red-500">{message}</h3>}
      <Form method="post" className="flex flex-col">
        <input
          className="border px-2 py-2 rounded-t-xl w-[400px]"
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="border px-2 py-2 rounded-b-xl w-[400px]"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="bg-blue-400 py-3 rounded-xl mt-10"> Sing In</button>
      </Form>
    </div>
  );
};

export default LogIn;
