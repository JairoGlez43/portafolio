import { ImageResponse } from "next/og";

export const alt = "Jairo González — Desarrollador Frontend";
export const size = { width: 1200, height: 630 };
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
          padding: 80,
          background:
            "radial-gradient(60% 60% at 30% 20%, rgba(96,165,250,0.25), transparent 70%), #0a0a0a",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 22,
            color: "#94a3b8",
            letterSpacing: 4,
          }}
        >
          JAIRO.GZ
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 28,
              color: "#94a3b8",
              fontFamily: "monospace",
            }}
          >
            Hola, soy
          </div>
          <div
            style={{
              fontSize: 128,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -3,
            }}
          >
            Jairo González
          </div>
          <div
            style={{
              fontSize: 44,
              color: "#94a3b8",
              fontWeight: 500,
            }}
          >
            Desarrollador Frontend
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#94a3b8",
            fontFamily: "monospace",
          }}
        >
          <div>React · Next.js · TypeScript</div>
          <div>Madrid, ES</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
