function positiveInteger(value: string | undefined, fallback: number) {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

const sameSite = process.env.AUTH_COOKIE_SAME_SITE;
const secure = process.env.AUTH_COOKIE_SECURE === "true" || process.env.NODE_ENV === "production";
const refreshTokenTransport = process.env.AUTH_REFRESH_TOKEN_TRANSPORT;

export const authConfig = {
    accessTokenCookie: process.env.AUTH_ACCESS_TOKEN_COOKIE || "taskflow_access_token",
    refreshTokenCookie: process.env.AUTH_REFRESH_TOKEN_COOKIE || "taskflow_refresh_token",
    accessTokenMaxAge: positiveInteger(process.env.AUTH_ACCESS_TOKEN_MAX_AGE, 900),
    refreshTokenMaxAge: positiveInteger(process.env.AUTH_REFRESH_TOKEN_MAX_AGE, 2_592_000),
    jwtSecret: process.env.AUTH_JWT_SECRET || process.env.JWT_SECRET || "",
    jwtIssuer: process.env.AUTH_JWT_ISSUER,
    jwtAudience: process.env.AUTH_JWT_AUDIENCE,
    refreshTokenTransport: refreshTokenTransport === "bearer" ? "bearer" : "body",
    refreshTokenEndpoint: process.env.AUTH_REFRESH_TOKEN_ENDPOINT || "auth/refresh-token",
    refreshTokenField: process.env.AUTH_REFRESH_TOKEN_FIELD || "refreshToken",
    cookie: {
        httpOnly: process.env.AUTH_COOKIE_HTTP_ONLY !== "false",
        secure,
        sameSite: sameSite === "strict" || (sameSite === "none" && secure) ? sameSite : "lax",
        path: process.env.AUTH_COOKIE_PATH || "/",
        ...(process.env.AUTH_COOKIE_DOMAIN ? { domain: process.env.AUTH_COOKIE_DOMAIN } : {}),
    },
} as const;