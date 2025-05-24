import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/blog")) {
    url.hostname = "fleetblox.site";
    url.protocol = "https";
    url.port = "";
    url.pathname = "/";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog", "/blog/:path*"],
};
