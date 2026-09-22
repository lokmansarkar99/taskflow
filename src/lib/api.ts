

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function fetcher<T>(path: string, options: RequestInit = {}): Promise<T> {

    const res = await fetch(`${API_URL}/${path}`, {
        ...options,
        headers: {"Content-Type": "application/json", ...options.headers}
    })
    if(!res.ok){
        throw new Error(`API Error: ${res.status}`)
    }
    return res.json()


}
