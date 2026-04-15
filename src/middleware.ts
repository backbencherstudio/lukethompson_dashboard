import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const { pathname } = request.nextUrl;

 
  

  // Public routes
  const publicRoutes = [
    "/login",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
    "/success",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Protected routes
  const isProtectedRoute = pathname.startsWith("/dashboard");

 

  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !accessToken) {
    
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if accessing public route with token
  if (isPublicRoute && accessToken) {
    
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
    "/success",
    "/dashboard/:path*",
  ],
};
