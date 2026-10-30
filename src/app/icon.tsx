import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
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
            fontSize: "18px",
            fontWeight: 400,
            fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
            color: "#FFFFFF",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            marginTop: "-1px",
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
