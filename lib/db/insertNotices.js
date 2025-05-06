import mongoose from "mongoose";
import connect from "./connect.js";
import Notices from "../schema/Notices.js";

async function insertNotices(notices) {
    await connect();

    const newNotices = await Notices.create(notices);

    if (!newNotices) {
        throw new Error("User not created");
    }

    return newNotices;
}

const sampleNotices = [
    {
        subject: "IT/Aptitude Classes Suspended",
        category: "TNP",
        postedby: new mongoose.Types.ObjectId("6812a3d21546465dc461973b"), // Example Admin ID
        postedbyid: 112200123457,
        noticefor: "Student",
        date: new Date("2025-04-22"),
        file: "/notices/notices.pdf"
    },
    {
        subject: "6th Sem Classes Suspended",
        category: "Holiday",
        postedby: new mongoose.Types.ObjectId("6812a3d21546465dc461973b"), // Example Admin ID
        postedbyid: 112200123457,
        noticefor: "All",
        date: new Date("2025-04-21"),
        file: "/notices/notices.pdf"
    },
    {
        subject: "Quantiphi Pre Placement Talk",
        category: "TNP",
        postedby: new mongoose.Types.ObjectId("6812a3d21546465dc461973b"), // Example Admin ID
        postedbyid: 112200123457,
        noticefor: "Student",
        date: new Date("2025-04-19"),
        file: "/notices/notices.pdf"
    },
    {
        subject: "Minor Project Submission",
        category: "Project",
        postedby: new mongoose.Types.ObjectId("6812a3d21546465dc461973b"), // Example Admin ID
        postedbyid: 112200123457,
        noticefor: "Student",
        date: new Date("2025-04-04"),
        file: "/notices/notices.pdf"
    },
    {
        subject: "Scholarship Renewal Deadline",
        category: "Scholarship",
        postedby: new mongoose.Types.ObjectId("6812a3d21546465dc461973b"), // Example Admin ID
        postedbyid: 112200123457,
        noticefor: "Student",
        date: new Date("2025-04-15"),
        file: "/notices/notices.pdf"
    },
    {
        subject: "Faculty Meeting on Curriculum Changes",
        category: "Meeting",
        postedby: new mongoose.Types.ObjectId("6812a3d21546465dc461973b"), // Example Admin ID
        postedbyid: 112200123457,
        noticefor: "Faculty",
        date: new Date("2025-04-15"),
        file: "/notices/notices.pdf"
    }
];

console.log(await insertNotices(sampleNotices));