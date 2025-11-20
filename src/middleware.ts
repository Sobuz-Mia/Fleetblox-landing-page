import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/blog")) {
    // url.hostname = "fleetblox.site";
    url.hostname = "blog.fleetblox.com";
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
