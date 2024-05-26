/* eslint-disable @next/next/no-img-element */
/* eslint-disable jex-a11y/alt-text */
// @ts-nocheck

import { ImageResponse } from "next/og"
import { ogImageSchema } from "@/schemas"

// Route segment config
export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    // const values = ogImageSchema.parse(Object.fromEntries(url.searchParams))
    // const {
    //   title,
    //   paragraph,
    //   publishedAt,
    //   likesCount,
    //   commentsCount,
    //   publisher,
    //   publisherAvatar,
    //   imageUrl,
    // } = values

    const title = "Understanding Artificial Intelligence"
    const paragraph =
      "Artificial Intelligence (AI) is revolutionizing the way we live, work, and interact with technology. By simulating human intelligence, AI systems can perform tasks that typically require human cognition, such as learning, reasoning, problem-solving, and decision-making."
    const publishedAt = "2024-05-17T07:43:16.452619+00:00"
    const likesCount = "0"
    const commentsCount = "1"
    const publisher = "Ammari Abdelmounaim"
    const publisherAvatar =
      "https://lh3.googleusercontent.com/a/ACg8ocJzD16U59XloyKFE4m5iNXktYEw1gPYNqQIPbInMdTyeASxZ6M=s96-c"
    const imageUrl =
      "https://lh3.googleusercontent.com/a/ACg8ocJzD16U59XloyKFE4m5iNXktYEw1gPYNqQIPbInMdTyeASxZ6M=s96-c"

    console.log(imageUrl)

    const imageData = await fetch(new URL(imageUrl, import.meta.url)).then(
      (res) => res.arrayBuffer()
    )

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

    const coverImg = fetch(new URL(imageUrl, import.meta.url)).then((res) =>
      res.arrayBuffer()
    )
    const avatarImg = fetch(new URL(publisherAvatar, import.meta.url)).then(
      (res) => res.arrayBuffer()
    )

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
                    AA
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
                    {publisher}
                  </span>
                  <span style={{ fontSize: "14px", color: "#6B7280" }}>
                    Published on {publishedAt}
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
                  {title}
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
                  {paragraph}
                </p>
              </div>
              {/* cover image */}
              <div
                style={{
                  display: "flex",
                  overflow: "hidden",
                  borderRadius: "8px",
                  width: "200px",
                  height: "120px",
                  backgroundColor: "#000000",
                  flexGrow: 1,
                }}
              >
                <img width={200} height={120} src={await coverImg} />
              </div>
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
                {likesCount}
              </span>
              <img width={16} height={16} src={await messageCircleIcon} />

              <span
                style={{
                  color: "#2F65FF",
                }}
              >
                {commentsCount} comments
              </span>
            </div>
          </div>
        </div>
      ),
      {
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
