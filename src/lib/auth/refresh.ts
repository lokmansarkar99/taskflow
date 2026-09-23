import { authConfig } from "./config";

interface RefreshApiResponse {
    success?: boolean;
    data?: { accessToken?: string };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export async function refreshAccessToken(refreshToken: string): Promise<string | null> {
    if (!API_URL) return null;

    const headers: HeadersInit = { "Content-Type": "application/json" };
    const request: RequestInit = {
        method: "POST",
        headers,
        cache: "no-store",
    };

    if (authConfig.refreshTokenTransport === "bearer") {
        headers.Authorization = `Bearer ${refreshToken}`;
    } else {
        request.body = JSON.stringify({ [authConfig.refreshTokenField]: refreshToken });
    }

    try {
        const response = await fetch(`${API_URL}/${authConfig.refreshTokenEndpoint}`, request);
        const data = (await response.json().catch(() => null)) as RefreshApiResponse | null;
        return response.ok && data?.success !== false && typeof data?.data?.accessToken === "string"
            ? data.data.accessToken
            : null;
    } catch {
        return null;
    }
}