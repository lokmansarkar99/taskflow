import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/login-form";

export default async function LoginPage() {
    const session = await getSession();
    if (session) redirect(session.user.role === "ADMIN" ? "/admin" : "/task");

    return <LoginForm />;
}