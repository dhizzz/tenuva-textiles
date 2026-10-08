import { ImageResponse } from "next/og";

export const alt = "Tenuva Textiles. Woven with discipline.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const warp = [0, 1, 2, 3];
  const weft: [number, number][] = [
    [0, 0],
    [2, 0],
    [1, 1],
    [3, 1],
    [0, 2],
    [2, 2],
    [1, 3],
    [3, 3],
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#17204D",
          color: "#F3EEE4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 18,
              background: "#F3EEE4",
              position: "relative",
              display: "flex",
              overflow: "hidden",
              border: "5px solid #17204D",
            }}
          >
            {warp.map((i) => (
              <div key={i} style={{ position: "absolute", left: 10 + i * 27, top: 0, width: 17, height: 120, background: "#17204D" }} />
            ))}
            {weft.map(([c, r]) => (
              <div
                key={`${c}${r}`}
                style={{ position: "absolute", left: 4 + c * 27, top: 12 + r * 27, width: 33, height: 17, background: "#E8A33D" }}
              />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 72, fontWeight: 700, lineHeight: 1 }}>Tenuva</span>
            <span style={{ fontSize: 22, letterSpacing: 12, color: "#A9B8A0", marginTop: 8 }}>TEXTILES</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 120, lineHeight: 1, letterSpacing: -3 }}>Woven with</span>
          <span style={{ fontSize: 120, lineHeight: 1, letterSpacing: -3, fontStyle: "italic", color: "#E8A33D" }}>discipline.</span>
        </div>
      </div>
    ),
    size,
  );
}
