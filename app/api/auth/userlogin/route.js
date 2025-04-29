import { NextResponse } from "next/server";
import connect from "@/lib/db/connect";
import Users from "@/lib/schema/Users";

export async function POST(req, res) {
    await connect();
    try {
        const { username, password } = await req.json();

        const user = await Users.findOne({ username, password }, "-__v -createdAt -updatedAt -_id -academics -address -college -password").lean().exec();

        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }
        return NextResponse.json({ message: "Login successful", user }, { status: 200 });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}