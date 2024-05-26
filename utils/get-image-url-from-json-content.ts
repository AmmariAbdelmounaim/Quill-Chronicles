import { JSONContent } from "novel"

export function getImageUrlFromJsonContent(
  content: JSONContent
): string | undefined {
  if (content.type === "image" && content.attrs && content.attrs.src) {
    return content.attrs.src
  }

  if (content.content) {
    for (const child of content.content) {
      const result = getImageUrlFromJsonContent(child)
      if (result) {
        return result
      }
    }
  }

  return undefined
}
