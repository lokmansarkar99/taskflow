import "server-only";

import { cookies } from "next/headers";
import { verifyAccessToken, type AccessTokenClaims } from "./token";
import { authConfig } from "./config";

export const ACCESS_TOKEN_COOKIE = authConfig.accessTokenCookie;
export const REFRESH_TOKEN_COOKIE = authConfig.refreshTokenCookie;

export interface AuthSession {
    accessToken: string;
    user: AccessTokenClaims;
}

interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export async function setAuthCookies(tokens: TokenPair) {
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
        ...authConfig.cookie,
        maxAge: authConfig.accessTokenMaxAge,
    });
    cookieStore.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
        ...authConfig.cookie,
        maxAge: authConfig.refreshTokenMaxAge,
    });
}

export async function clearAuthCookies() {
    const cookieStore = await cookies();
    cookieStore.delete(ACCESS_TOKEN_COOKIE);
    cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

export async function getAccessToken() {
    return (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;
}

export async function getSession(): Promise<AuthSession | null> {
    const accessToken = await getAccessToken();
    if (!accessToken) return null;

    const user = await verifyAccessToken(accessToken);
    if (!user) {
        return null;
    }

    return { accessToken, user };
}