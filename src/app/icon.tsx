import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

// Fetch a TTF for Fraunces (the serif used by the Hero title) via the Google
// Fonts CSS API. Passing the `text` parameter makes Google return a CSS
// snippet whose `src` resolves to a TTF rather than the default woff2, which
// is what Satori needs to rasterize the glyphs.
async function loadFraunces(text: string): Promise<ArrayBuffer | null> {
  const url = `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&text=${encodeURIComponent(text)}`;
  try {
    const css = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)",
      },
    }).then((res) => res.text());
    const match = css.match(
      /src:\s*url\(([^)]+)\)\s*format\('(?:truetype|opentype)'\)/
    );
    if (!match) return null;
    const buffer = await fetch(match[1]).then((res) => res.arrayBuffer());
    return buffer;
  } catch {
    return null;
  }
}

export default async function Icon() {
  const fontData = await loadFraunces("AR");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a1f",
          borderRadius: 12,
          color: "#f7f4ee",
          fontFamily: "Fraunces",
          fontSize: 34,
          fontWeight: 500,
          letterSpacing: -1,
          paddingBottom: 2,
        }}
      >
        AR
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: "Fraunces",
              data: fontData,
              style: "normal",
              weight: 500,
            },
          ]
        : undefined,
    }
  );
}
