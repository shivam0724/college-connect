"use server";

import connect from "../db/connect";
import Notices from "../schema/Notices";
import Users from "../schema/Users";
import { noticesId } from "../id";
import fs from "fs/promises";
import path from "path";

async function fetchNotices(role) {
    await connect();
    if (!role) {
        throw new Error("Role is required to fetch notices.");
    }

    role = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    if (role !== "Student" && role !== "Faculty") {
        throw new Error("Invalid role. Role must be either 'Student' or 'Faculty'.");
    }
    const notices = await Notices.find({ noticefor: { $in: [role, "All"] } }, "-_id -__v -createdAt -updatedAt").sort({ date: -1 }).lean();

    if (!notices) {
        return [];
    }

    return notices.map((notice) => ({
        id: notice.id,
        subject: notice.subject,
        category: notice.category,
        postedby: notice?.postedby?.name || "Admin",
        date: new Date(notice.date).toLocaleDateString(),
        file: notice.file
    }));
}

async function postNotice(notice, id) {
    await connect();
    try {
        const faculty = await Users.findOne({ id }, { _id: 1 }).lean();
        if (!faculty) {
            throw new Error("Faculty not found. Please check your ID.");
        }

        const newNotice = await Notices.create({
            id: noticesId(),
            ...notice,
            postedbyid: id,
            noticefor: notice?.noticefor || "All",
            date: Date.now(),
        });

        if (!newNotice) {
            throw new Error("Failed to create notice. Please try again.");
        }
    } catch (error) {
        console.error("[notices.js]: Error posting notice:", error);
        throw new Error(error.message || "Failed to create notice. Please try again.");
    }

    return true;
}

async function deleteNotice(id) {
    await connect();
    try {
        if (!id) {
            throw new Error("Notice ID is required to delete notice.");
        }

        // const notice = await Notices.findOne({ id: id }).lean();
        // if (!notice) {
        //     throw new Error("Notice not found. Try refreshing the page.");
        // }
        const result = await Notices.deleteOne({ id: id });

        if (result.deletedCount === 0) {
            throw new Error("Failed to delete notice. Notice not found.");
        }
        
        // if (notice?.file && String(notice.file).split("/").at(-1) !== "default.pdf") {
        //     const uploadDir = path.join(process.cwd(), "public/uploads/notices");
        //     console.log('[notices.js]: ', await fs.readdir(uploadDir));
        //     const filePath = path.join(uploadDir, notice.file);
        //     await fs.unlink(filePath).catch((err) => {
        //         console.error("[notices.js]: Error deleting file:", err);
        //     });
        // }

        return true;
    } catch (error) {
        console.error("[notices.js]: Error deleting notice:", error);
        throw new Error(error.message || "Failed to delete notice. Please try again.");
    }
}

export { fetchNotices, deleteNotice, postNotice };