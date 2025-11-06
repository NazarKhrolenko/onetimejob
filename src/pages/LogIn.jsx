import React, { useState } from "react";

const LogIn = () => {
  const [logInData, setLogInData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="h-screen w-full flex justify-center flex-col items-center">
      <h1 className="text-3xl font-semibold pb-8">Sign in to your account</h1>
      <form className="flex flex-col">
        <input
          className="border px-2 py-2 rounded-t-xl w-[400px]"
          type="text"
          name="email"
          value={logInData.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="border px-2 py-2 rounded-b-xl w-[400px]"
          type="text"
          name="password"
          value={logInData.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="bg-blue-400 py-3 rounded-xl mt-10"> Sing In</button>
      </form>
    </div>
  );
};

export default LogIn;
