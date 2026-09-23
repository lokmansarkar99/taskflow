'use server'

import { redirect } from "next/navigation"
import fetcher from "../api"
import { clearAuthCookies, setAuthCookies } from "../auth/session"
import { firstValidationMessage, parseFormData } from "../validations/utils"
import { loginSchema, registerSchema } from "../validations/auth.validation"

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
    const parsed = parseFormData(registerSchema, formData);

    if (!parsed.success) {
        return {
            success: false,
            data: null,
            message: firstValidationMessage(parsed.error),
        };
    }

    const payload = { ...parsed.data, role: 'CLIENT' };

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

interface LoginApiResponse {
    success: boolean;
    message: string;
    data?: {
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: string;
            intakeCompleted: boolean;
        };
    };
}

export interface LoginFormState {
    success: boolean;
    message: string;
}

export async function loginAction(_prevState: LoginFormState | null, formData: FormData): Promise<LoginFormState> {
    const parsed = parseFormData(loginSchema, formData);

    if (!parsed.success) {
        return { success: false, message: firstValidationMessage(parsed.error) };
    }

    let response: LoginApiResponse;

    try {
        response = await fetcher<LoginApiResponse>("auth/login", {
            method: "POST",
            body: JSON.stringify(parsed.data),
        });
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unable to sign in",
        };
    }

    if (!response.success || !response.data?.accessToken || !response.data.refreshToken) {
        return { success: false, message: response.message || "Login failed" };
    }

    await setAuthCookies(response.data);
    redirect(response.data.user.role === "ADMIN" ? "/admin" : "/task");
}

export async function logoutAction() {
    await clearAuthCookies();
    redirect("/login");
}