import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";
import { routes } from "./routes";

export async function middleware(request: NextRequest) {
  try {
    const supabase = createClient();
    const { pathname } = request.nextUrl;
    await updateSession(request);

    // Redirect to login page if the user is not authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();
    // Get the current route
    let currentRoute;
    for (const key in routes) {
      if (pathname.endsWith(routes[key as keyof typeof routes].path)) {
        currentRoute = routes[key as keyof typeof routes];
        break;
      }
    }
    if (!user && currentRoute?.authRequired) {
      const redirectUrl = new URL(`${routes.home.path}`, request.url);

      return NextResponse.redirect(redirectUrl);
    } else if (
      (!user && currentRoute?.path.startsWith("/new-article")) ||
      currentRoute?.path.startsWith("/edit-article")
    ) {
      const redirectUrl = new URL(`${routes.home.path}`, request.url);

      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
