import { NextRequest, NextResponse } from "next/server";

const mobilePattern = /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== "/") {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  if (!mobilePattern.test(userAgent)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/mobile";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/"
};
