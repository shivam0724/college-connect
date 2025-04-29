"use server";

import { signIn } from "@/auth";

export default async function authenticate(data) {
    const { username, password } = data;

    if (!username || !password) {
        return {
            error: true,
            message: "Username and password are required."
        };
    }

    try {
        const res = await signIn('user', { redirect: false, username, password });
        console.log('[authentication.js]: ', res);

        return res?.error ? {
            error: true,
            status: res?.status || 401,
            message: res?.error?.message || "Invalid credentials."
        } : {
            error: false,
            url: res || "/",
            status: 200
        };
        
    }
    catch (error) {
        console.error("Login error:", error);
        return {
            error: true,
            message: "An error occurred during login. Please try again."
        };
    }
}