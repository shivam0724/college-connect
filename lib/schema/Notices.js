import mongoose from "mongoose";
import Admins from "./Admins.js";
import { noticesId } from "../id.js";

const NoticesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        index: true,
        unique: true,
        default: () => noticesId()
    },
    subject: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["TNP", "Scholarship", "Event", "Holiday", "Meeting", "Project", "Other"],
    },
    postedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admins",
        // required: true,
    },
    postedbyid: {
        type: Number,
        required: true,
    },
    noticefor: {
        type: String,
        required: true,
        enum: ["All", "Faculty", "Student"],
    },
    date: {
        type: Date,
        required: true,
        default: new Date().getTime(),
    },
    file: {
        type: String,
        required: true,
        default: "/student/notices/default.pdf",
    },
})

const Notices = mongoose.models.Notices || mongoose.model('Notices', NoticesSchema);

export default Notices;