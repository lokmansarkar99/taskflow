import { jwtVerify, type JWTPayload } from "jose";
import { authConfig } from "./config";

export type AuthRole = "CLIENT" | "ADMIN" | string;

export interface AccessTokenClaims {
    id: string;
    email: string;
    role: AuthRole;
    exp: number;
    iat: number;
    iss?: string;
    aud?: string | string[];
}

function isAccessTokenClaims(payload: JWTPayload): payload is JWTPayload & AccessTokenClaims {
    return (
        typeof payload.id === "string" &&
        typeof payload.email === "string" &&
        typeof payload.role === "string" &&
        typeof payload.exp === "number" &&
        typeof payload.iat === "number"
    );
}

export async function verifyAccessToken(token: string | undefined): Promise<AccessTokenClaims | null> {
    if (!token || !authConfig.jwtSecret) return null;
    if (process.env.NODE_ENV === "production" && (!authConfig.jwtIssuer || !authConfig.jwtAudience)) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(authConfig.jwtSecret), {
            algorithms: ["HS256"],
            ...(authConfig.jwtIssuer ? { issuer: authConfig.jwtIssuer } : {}),
            ...(authConfig.jwtAudience ? { audience: authConfig.jwtAudience } : {}),
            requiredClaims: ["exp", "iat"],
        });

        return isAccessTokenClaims(payload) ? payload : null;
    } catch {
        return null;
    }
}