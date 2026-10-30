import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          borderRadius: "50%",
        }}
      >
        <span
          style={{
            fontSize: "102px",
            fontWeight: 400,
            fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
            color: "#FFFFFF",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            marginTop: "-6px",
          }}
        >
          JK
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
