import { NextResponse } from "next/server";
import connect from "@/lib/db/connect";
import Users from "@/lib/schema/Users";
import { hash, compare } from "@/lib/authentication";

export async function POST(req, res) {
    await connect();
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
        }

        const user = await Users.findOne({ username }, "-__v -createdAt -updatedAt -_id -academics -address -college").lean().exec();

        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }
        
        return NextResponse.json({ message: "Login successful", user }, { status: 200 });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}