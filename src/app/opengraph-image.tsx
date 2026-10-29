import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — Chief Innovation Officer`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0A0A0A",
          color: "#FFFFFF",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top Tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#E5E5E5",
            }}
          />
          <span
            style={{
              fontSize: "18px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#E5E5E5",
              fontFamily: "monospace",
            }}
          >
            AI Innovation · Enterprise Transformation
          </span>
        </div>

        {/* Central Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontSize: "28px",
              letterSpacing: "0.1em",
              color: "#E5E5E5",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            {siteConfig.name}
          </span>
          <h1
            style={{
              fontSize: "76px",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Chief Innovation Officer
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#A0A0A0",
              maxWidth: "850px",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Designing intelligent systems, autonomous architectures, and responsible AI governance.
          </p>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(229, 229, 229, 0.2)",
            paddingTop: "32px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              color: "#E5E5E5",
            }}
          >
            EXECUTIVE PORTFOLIO
          </span>
          <span
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              color: "#A0A0A0",
            }}
          >
            EN · IT · AR
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
