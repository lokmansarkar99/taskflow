import {z} from "zod";

export function parseFormData<TSchema extends z.ZodType>(schema: TSchema, formData: FormData) {
    return schema.safeParse(Object.fromEntries(formData.entries()));
}

export function firstValidationMessage(error: z.ZodError) {
    return error.issues[0]?.message ?? "Please check the submitted fields";
}