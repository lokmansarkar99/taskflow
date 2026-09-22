'use server'

import fetcher from "../api"

interface RegisterApiResponse {
    statusCode?: number;
    success?: boolean;
    message?: string;
    data?: {
        id: string;
        name: string;
        email: string;
        role: string;
        createdAt?: string;
    };
}

export interface RegisterFormState {
    success: boolean;
    data: RegisterApiResponse | null;
    message: string;
}

export async function registerAction(prevState: RegisterFormState | null, formData: FormData) {
    const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: 'CLIENT'
    };
// console.log("registerAction payload:", payload);
    try {
        // fetcher return the parsed JSON response from the backend
        const data = await fetcher<RegisterApiResponse>('auth/register', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        return { 
            success: true, 
            data: data, 
            message: data?.message || "Registration successful" 
        };

    } catch (error) {
        // here we get the error thrown by fetcher function, which is either the error message from the backend or a default error message
        return { 
            success: false, 
            data: null, 
            message: (error as Error).message || "Something went wrong" 
        };
    }
}