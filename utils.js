import { redirect } from "react-router-dom";

export async function requireAuth() {
  const isLoggedin = localStorage.getItem("loggedin");

  if (!isLoggedin) {
    const response = redirect("/login/?message=You must log in first");
    response.body = true;
    return response;
  }
}
