import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES } from "./i18n/config";
import { detectRegionLocale } from "./i18n/geo";

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

  // Extract region / country signals from edge proxy headers
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    request.headers.get("cloudfront-viewer-country") ||
    request.headers.get("x-real-ip-country") ||
    (request as unknown as { geo?: { country?: string } }).geo?.country;

  const acceptLanguage = request.headers.get("accept-language");
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

  // Identify region and determine default locale
  const targetLocale = detectRegionLocale({
    country,
    acceptLanguage,
    cookieLocale,
  });

  // Redirect root or non-localized route to the regional default locale
  const url = request.nextUrl.clone();
  url.pathname = `/${targetLocale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);

  // Attach diagnostic telemetry headers
  response.headers.set("x-detected-locale", targetLocale);
  if (country) {
    response.headers.set("x-detected-country", country);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
