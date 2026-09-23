import {z} from 'zod';

export const registerSchema = z.object({
    name: z.string().trim().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().trim().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export const loginSchema = z.object({
    email: z.string().trim().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});