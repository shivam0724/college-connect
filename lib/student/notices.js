"use server";

import connect from "../db/connect";
import Notices from "../schema/Notices";

async function fetchNotices(role) {
    await connect();
    const notices = await Notices.find({ noticefor: { $in: [role, "All"] } }).populate("postedby", "name email phone").sort({ date: -1 });

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

export { fetchNotices }