import { ImageResponse } from "next/og"

export const runtime = "nodejs"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #2c2622 0%, #171412 100%)",
          color: "#e8dcc8",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        D
      </div>
    ),
    { ...size }
  )
}
