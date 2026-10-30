import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <circle cx="256" cy="256" r="256" fill="#0A0A0A" />
  <text
    x="50%"
    y="52%"
    text-anchor="middle"
    dominant-baseline="middle"
    fill="#FFFFFF"
    font-family="ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif"
    font-size="240"
    font-weight="400"
    letter-spacing="-8"
  >JK</text>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
