import { getAccessToken } from "./auth/session";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type FetcherOptions = RequestInit & { authenticated?: boolean };

export default async function fetcher<T>(path: string, options: FetcherOptions = {}): Promise<T> {
    const { authenticated = false, ...requestOptions } = options;
    const accessToken = authenticated ? await getAccessToken() : undefined;

    const res = await fetch(`${API_URL}/${path}`, {
        ...requestOptions,
        ...(authenticated ? { cache: "no-store" as const } : {}),
        headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...requestOptions.headers,
        },
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        //throw error from response body or default to response status
        throw new Error(data?.message || `API Error: ${res.status}`);
    }

    return data;
}