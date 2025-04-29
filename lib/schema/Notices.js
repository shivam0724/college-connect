import mongoose from "mongoose";
import Admins from "./Admins.js";

const NoticesSchema = new mongoose.Schema({
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

/**
 * @typedef {mongoose.Model<mongoose.Document>} Notices
 */
let Notices;
try {
    Notices = mongoose.model('Notices');
}
catch {
    Notices = mongoose.model('Notices', NoticesSchema);
}

export default Notices;