import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import Users from "@/lib/schema/Users";
import crypto from "crypto";
import Files from "@/lib/schema/Files";
import connect from "@/lib/db/connect";
import { fileId } from "@/lib/id";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");
        const id = formData.get("id");
        const category = formData.get("category");

        if (!id) {
            return NextResponse.json({ error: "ID is required." }, { status: 400 });
        }
        if (!file || !category) {
            return NextResponse.json({ error: "File and category are required." }, { status: 400 });
        }

        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "File size exceeds 5MB." }, { status: 400 });
        }

        const user = await Users.findOne({ id: id }, { _id: 1 }).lean();

        if (!user) {
            return NextResponse.json({ error: "Unauthorised access detected." }, { status: 401 });
        }

        const fileHash = await getFileHash(file);
        const existingFile = await Files.findOne({ hash: fileHash }).lean();
        if (existingFile) {
            console.log('[route.js]: ', "File already exists in the database.");
            return NextResponse.json({
                message: "File uploaded successfully!",
                url: existingFile.url,
            }, { status: 200 });
        }

        const uploadDir = path.join(process.cwd(), "public/uploads", String(category).toLowerCase());

        await fs.mkdir(uploadDir, { recursive: true });

        const fileName = `${crypto.randomUUID()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        const fileData = await file.arrayBuffer();
        const fileUrl = `/uploads/${category}/${fileName}`;
        await fs.writeFile(filePath, Buffer.from(fileData));

        const newFile = await Files.create({
            id: fileId(),
            name: file.name,
            size: file.size,
            savedAs: fileName,
            type: file.type,
            category: String(category).toLowerCase(),
            uploadedbyid: id,
            hash: fileHash,
            url: fileUrl,
        })

        if (!newFile) {
            console.error("Failed to save file information to the database.");
            await fs.unlink(filePath);
            return NextResponse.json({ error: "Failed to save file information." }, { status: 500 });
        }

        return NextResponse.json({
            message: "File uploaded successfully!!",
            url: fileUrl,
        }, { status: 200 });
    } catch (error) {
        console.error("Error in file upload:", error);
        return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
    }
}

async function getFileHash(file) {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    return hash;
}