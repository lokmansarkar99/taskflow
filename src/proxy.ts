import { NextResponse, type NextRequest } from "next/server";
import { authConfig } from "@/lib/auth/config";
import { refreshAccessToken } from "@/lib/auth/refresh";
import { verifyAccessToken } from "@/lib/auth/token";

function setAccessToken(response: NextResponse, accessToken: string) {
    response.cookies.set(authConfig.accessTokenCookie, accessToken, {
        ...authConfig.cookie,
        maxAge: authConfig.accessTokenMaxAge,
    });
}

function clearAuthCookies(response: NextResponse) {
    response.cookies.delete(authConfig.accessTokenCookie);
    response.cookies.delete(authConfig.refreshTokenCookie);
}

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get(authConfig.accessTokenCookie)?.value;
    const refreshToken = request.cookies.get(authConfig.refreshTokenCookie)?.value;
    let claims = await verifyAccessToken(accessToken);
    let refreshedAccessToken: string | null = null;

    if (!claims && refreshToken) {
        refreshedAccessToken = await refreshAccessToken(refreshToken);
        claims = await verifyAccessToken(refreshedAccessToken ?? undefined);
        if (claims && refreshedAccessToken) {
            request.cookies.set(authConfig.accessTokenCookie, refreshedAccessToken);
        }
    }

    const response = NextResponse.next({ request: { headers: request.headers } });
    if (claims && refreshedAccessToken) setAccessToken(response, refreshedAccessToken);

    const hasSession = Boolean(claims);
    const isProtectedRoute = pathname.startsWith("/task") || pathname.startsWith("/admin");
    const isAuthRoute = pathname === "/login" || pathname === "/register";

    if (isProtectedRoute && !hasSession) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        const redirectResponse = NextResponse.redirect(loginUrl);
        clearAuthCookies(redirectResponse);
        return redirectResponse;
    }

    if (pathname.startsWith("/admin") && claims?.role !== "ADMIN") {
        const redirectResponse = NextResponse.redirect(new URL("/task", request.url));
        const refreshedCookie = response.cookies.get(authConfig.accessTokenCookie);
        if (refreshedCookie) {
            redirectResponse.cookies.set(refreshedCookie);
        }
        return redirectResponse;
    }

    if (isAuthRoute && hasSession) {
        const redirectResponse = NextResponse.redirect(new URL(claims?.role === "ADMIN" ? "/admin" : "/task", request.url));
        if (response.cookies.get(authConfig.accessTokenCookie)) {
            redirectResponse.cookies.set(response.cookies.get(authConfig.accessTokenCookie)!);
        }
        return redirectResponse;
    }

    return response;
}

export const config = {
    matcher: ["/task/:path*", "/admin/:path*", "/login", "/register"],
};