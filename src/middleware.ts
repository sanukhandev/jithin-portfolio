import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname starts with a supported locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Exclude static assets, api routes, internal next paths, and seo metadata endpoints
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") || // files like favicon.ico, sitemap.xml, robots.txt, etc.
    pathname === "/opengraph-image"
  ) {
    return NextResponse.next();
  }

  // Redirect root or non-localized route to default locale /en
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Match all pathnames except for static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
