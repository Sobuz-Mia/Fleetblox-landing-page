import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/blog")) {
    // Change to fleetblox.site domain
    url.hostname = "fleetblox.site";
    url.protocol = "https";
    url.port = "443";
    url.pathname = "/";

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/blog/:path*",
};