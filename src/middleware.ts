import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/Auth";
 
// Define authentication route and protected routes
const AuthRoutes = ["/login"];
const protectedRoutes = ["/dashboard", "/dashboard/:page*"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the user is authenticated
  const user = await getCurrentUser();

  // If the user is not authenticated and trying to access protected routes
  if (!user) {
    // Allow access to authentication routes (login)
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else if (protectedRoutes.some((route) => pathname.match(route))) {
      // Redirect to login page if trying to access the dashboard or protected route
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  } else {
    // Allow authenticated users to access the dashboard and any other routes
    if (protectedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // Allow access to any other routes
  return NextResponse.next();
}

// Configuration for matching paths
export const config = {
  matcher: ["/dashboard", "/dashboard/:page*"],
};
