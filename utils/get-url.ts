export const getURL = () => {
  let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000/" // Automatically set by Vercel.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`
  return url
}
