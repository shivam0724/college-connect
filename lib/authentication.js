"use server";

import { signIn, auth } from "@/auth";
import bcrypt from "bcrypt";

export default async function authenticate(data) {
    const { username, password } = data;

    if (!username || !password) {
        return {
            error: true,
            message: "Username and password are required."
        };
    }

    try {
        const res = await signIn('user', { redirect: false, username, password, callbackUrl: "/login" });
        const session = await auth();

        if (res && session) {
            return {
                error: false,
                message: "Login successful.",
                status: 200,
                url: session?.url,
            }
        }

        return !res?.error && {
            error: false,
            url: res || "/",
            status: 200,
            message: "Login successful.",
        };

    }
    catch (error) {
        if (["AccessDenied", "CredentialsSignin"].includes(error?.type)) {
            return {
                error: true,
                message: "Invalid credentials.",
                status: 401
            };
        }
        console.log('[authentication.js]: ', error);
        return {
            error: true,
            message: "An error occurred during login. Please try again."
        };
    }
}

export const session = async () => {
    return await auth();
};

async function hash(string) {
    const hashed = await bcrypt.hash(string, 12);
    return hashed;
}

async function compare(string, hashed) {
    const isMatch = await bcrypt.compare(string, hashed);
    return isMatch;
}

export { hash, compare };