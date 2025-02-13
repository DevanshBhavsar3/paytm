import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

async function checkForAuth(req: NextRequestWithAuth) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export async function middleware(req: NextRequestWithAuth) {
  return checkForAuth(req);
}

export const config = {
  matcher: ["/api/user/:path*", "/api/account/:path*"],
};
