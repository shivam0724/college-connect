"use server";

import { auth } from "@/auth";
import connect from "./db/connect";
import Users from "./schema/Users";
import crypto from "crypto";
import { hash } from "./authentication";

export default async function getUser() {
    const session = await auth();
    const { id } = session;

    if (!id) {
        return null;
    }

    try {
        await connect();
        const user = await Users.findOne({ id: id }, "-password -_id -__v -createdAt -updatedAt").lean();

        if (!user) {
            return null;
        }

        return JSON.stringify(user);
    } catch (error) {
        console.error("[getUser]: ", error);
        return null;
    }
}

async function getUserByUsername(username) {
    if (!username) {
        return null;
    }

    try {
        await connect();
        const user = await Users.findOne({ username: username }, "-password -_id -__v -createdAt -updatedAt").lean();
        if (!user) {
            throw new Error("User not found.");
        }
        return JSON.stringify(user);
    } catch (error) {
        console.error("[getUserByUsername]: ", error);
        throw new Error(error.message || "Failed to fetch user. Please try again.");
    }
}

async function checkUserExists(username) {
    if (!username) {
        throw new Error("Username is required.");
    }

    try {
        await connect();

        const user = await Users.countDocuments({ username: username }).lean();
        if (user > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("[checkUserExists]: ", error);
        throw new Error(error.message || "Failed to check user existence. Please try again.");
    }
}

async function resetPassword(username, password) {
    if (!username || !password) {
        throw new Error("Username and password are required.");
    }

    try {
        await connect();

        const hashedPassword = await hash(password);

        const user = await Users.findOneAndUpdate(
            { username: username },
            { password: hashedPassword },
            { select: "id" }
        ).lean();

        if (!user) {
            throw new Error("Failed to update password. User not found.");
        }

        return true;
    } catch (error) {
        console.error("[updatePassword]: ", error);
        throw new Error(error.message || "Failed to update password. Please try again.");
    }
}

export { getUserByUsername, checkUserExists, resetPassword };