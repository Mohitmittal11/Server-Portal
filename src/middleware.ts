import { NextResponse, NextRequest } from "next/server";
const publicPage = ["/", "/admin/login", "/user/login", "/user/reset-password"];
const protectedRoutes = ["/admin/user", "/admin/server", "/user"];

export async function middleware(req: NextRequest) {
  const { cookies, nextUrl } = req;
  const token = cookies.get("adminToken")?.value;
  const userToken = cookies.get("userToken")?.value;
  const role = cookies.get("role")?.value;

  // Redirect to login if a protected page is accessed without a token
  if (!token && !userToken && protectedRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // else if (
  //   !token &&
  //   protectedRoutes.includes(nextUrl.pathname) &&
  //   role == "user"
  // ) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
  // Prevent redirect loop by only redirecting when needed
  else if (
    token &&
    protectedRoutes.includes(nextUrl.pathname) &&
    nextUrl.pathname.startsWith("/user") &&
    role == "admin"
  ) {
    return NextResponse.redirect(new URL("/admin/user", req.url));
  } else if (
    userToken &&
    protectedRoutes.includes(nextUrl.pathname) &&
    nextUrl.pathname.startsWith("/admin") &&
    role == "user"
  ) {
    return NextResponse.redirect(new URL("/user", req.url));
  } else if (
    token &&
    publicPage.includes(nextUrl.pathname) &&
    role == "admin"
  ) {
    return NextResponse.redirect(new URL("/admin/user", req.url));
  } else if (
    userToken &&
    publicPage.includes(nextUrl.pathname) &&
    role == "user"
  ) {
    return NextResponse.redirect(new URL("/user", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/admin/login",
    "/admin/user",
    "/user/login",
    "/admin/server",
    "/user/reset-password",
    "/user",
  ],
};
