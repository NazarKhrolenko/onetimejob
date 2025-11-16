import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const isLoggedin = localStorage.getItem("loggedin");

  if (!isLoggedin) {
    const pathname = new URL(request.url).pathname;

    const response = redirect(
      `/login?message=You must log in first&redirectTo=${pathname}`
    );
    response.body = true;
    return response;
  }
  return null;
}
