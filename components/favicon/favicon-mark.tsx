import type { FaviconPreset } from "@/lib/favicon-preset"

type FaviconMarkProps = {
  preset: FaviconPreset
  size: "sm" | "lg"
}

const circleBase = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(145deg, #2c2622 0%, #171412 100%)",
} as const

export function FaviconMark({ preset, size }: FaviconMarkProps) {
  const lg = size === "lg"

  if (preset === "stack") {
    return (
      <div
        style={{
          ...circleBase,
          flexDirection: "column",
          gap: lg ? 12 : 2,
        }}
      >
        <div
          style={{
            width: lg ? 104 : 16,
            height: lg ? 14 : 3,
            borderRadius: 9999,
            background: "#e8dcc8",
          }}
        />
        <div
          style={{
            width: lg ? 76 : 12,
            height: lg ? 14 : 3,
            borderRadius: 9999,
            background: "#e8dcc8",
            opacity: 0.92,
          }}
        />
        <div
          style={{
            width: lg ? 52 : 8,
            height: lg ? 14 : 3,
            borderRadius: 9999,
            background: "#e8dcc8",
            opacity: 0.85,
          }}
        />
      </div>
    )
  }

  if (preset === "d") {
    return (
      <div style={circleBase}>
        <span
          style={{
            color: "#e8dcc8",
            fontSize: lg ? 88 : 15,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          D
        </span>
      </div>
    )
  }

  if (preset === "du") {
    return (
      <div style={circleBase}>
        <span
          style={{
            color: "#e8dcc8",
            fontSize: lg ? 58 : 11,
            fontWeight: 700,
            letterSpacing: "-0.1em",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          DU
        </span>
      </div>
    )
  }

  return (
    <div style={circleBase}>
      <span
        style={{
          color: "#e8dcc8",
          fontSize: lg ? 52 : 10,
          fontWeight: 700,
          letterSpacing: "-0.06em",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
        }}
      >
        {"</>"}
      </span>
    </div>
  )
}
