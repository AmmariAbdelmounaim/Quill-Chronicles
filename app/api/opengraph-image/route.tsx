/* eslint-disable @next/next/no-img-element */
/* eslint-disable jex-a11y/alt-text */
// @ts-nocheck

import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// params for OG Image
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const hasArticcleId = searchParams.has("articleId")

    const articleId = hasArticcleId
      ? searchParams.get("articleId")?.slice(0, 100)
      : "f27eb044-2d9c-48e6-8bec-c277bfb9254e"

    const imageData = await fetch(
      new URL(
        "https://zeyh1gvg08ufcict.public.blob.vercel-storage.com/b7f09dcf-de9f-4fba-97e5-b27d72aa14d1-4G8v9TfKeU74qhY0DvKHs50DPLeBsT.png",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer())

    const fontInterBlack = fetch(
      new URL(
        "../../../styles/fonts/Inter/static/Inter-Regular.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer())

    const fontPlayFairDisplay = fetch(
      new URL(
        "../../../styles/fonts/Playfair_Display/static/PlayfairDisplay-Black.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer())

    const heartIcon = fetch(
      new URL("../../../assets/heart.png", import.meta.url)
    ).then((res) => res.arrayBuffer())

    const messageCircleIcon = fetch(
      new URL("../../../assets/message-circle.png", import.meta.url)
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            maxWidth: "768px",
            flexDirection: "column",
            gap: "16px",
            borderRadius: "8px",
            backgroundColor: "white",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    height: "48px",
                    width: "48px",
                    flexShrink: 0,
                    overflow: "hidden",
                    borderRadius: "50%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      height: "100%",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      backgroundColor: "#E5E7EB",
                    }}
                  >
                    JD
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "12px",
                  }}
                >
                  <span style={{ fontWeight: "500", marginTop: "4px" }}>
                    John Doe
                  </span>
                  <span style={{ fontSize: "14px", color: "#6B7280" }}>
                    Published on May 23, 2024
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "9999px",
                  border: "1px solid #2F65FF",
                  padding: "4px 10px",
                  fontSize: "12px",
                  fontWeight: "600",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                New
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "450px",
                  marginRight: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    fontFamily: "PlayFairDisplay",
                    color: "#2F65FF",
                  }}
                >
                  The Future of Web Development: Exploring Cutting-Edge Trends
                </h3>
                <p
                  style={{
                    fontFamily: "Inter",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    color: "#4B5563",
                  }}
                >
                  In this rapidly evolving digital age, web development is
                  constantly pushing boundaries and embracing new technologies.
                  From the rise of artificial intelligence and learning the
                  advent of serverless architectures and progressive web apps,
                  the future of web development promises to be an exciting and
                  transformative journey.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  overflow: "hidden",
                  borderRadius: "8px",
                  width: "200px",
                  height: "120px",
                  backgroundColor: "#E5E7EB",
                  flexGrow: 1,
                }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "#6B7280",
              }}
            >
              <img width={16} height={16} src={await heartIcon} />
              <span
                style={{
                  color: "#2F65FF",
                }}
              >
                1,234 views
              </span>
              <img width={16} height={16} src={await messageCircleIcon} />

              <span
                style={{
                  color: "#2F65FF",
                }}
              >
                24 comments
              </span>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: "Inter",
            data: await fontInterBlack,
            style: "normal",
            weight: 400,
          },
          {
            name: "PlayFairDisplay",
            data: await fontPlayFairDisplay,
            style: "normal",
            weight: 400,
          },
        ],
      }
    )
  } catch (error) {
    return new Response("Failed to generated OG Image", { status: 500 })
  }
}
