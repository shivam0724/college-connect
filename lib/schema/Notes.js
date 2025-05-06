import mongoose, { mongo } from "mongoose";
import Users from "./Users.js";
import { noticesId } from "../id.js";

const NotesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        index: true,
        unique: true,
        default: () => noticesId
    },
    topic: {
        type: String,
        required: true
    },
    subject: {
        type: Object,
        required: true,
        default: {
            name: String,
            code: String
        }
    },
    description: {
        type: String,
        required: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    facultyid: {
        type: Number,
        required: true,
        index: true,
    },
    givento: {
        type: [{
            college: String,
            branch: String,
            semester: Number,
            section: String,
        }],
        default: [{
            college: String,
            branch: String,
            semester: Number,
            section: String,
        }]
    },
    forall: {
        type: Boolean,
        default: false
    },
    givenon: {
        type: Date,
        required: true,
        default: new Date().getTime()
    },
    file: {
        type: String,
        required: true,
        default: "/notes/notes.pdf",
    },
},
    {
        timestamps: true
    }
)

const Notes = mongoose.models.Notes || mongoose.model('Notes', NotesSchema);

export default Notes;
// /**
//  * @typedef {mongoose.Model<mongoose.Document>} Notes
//  */
// let Notes;
// try {
//     Notes = mongoose.model('Notes');
// }
// catch {
//     Notes = mongoose.model('Notes', NotesSchema);
// }

// export default Notes;