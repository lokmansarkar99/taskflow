const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function fetcher<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_URL}/${path}`, {
        ...options,
        headers: { "Content-Type": "application/json", ...options.headers }
    });

    const data = await res.json();

    if (!res.ok) {
        //throw error from response body or default to response status
        throw new Error(data?.message || `API Error: ${res.status}`);
    }

    return data;
}