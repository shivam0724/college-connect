import mongoose from "mongoose";
import Users from "./Users.js";

const NotesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        index: true,
        unique: true,
        default: () => 991100000 + Math.floor(Math.random() * 1000000)
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
    givento: {
        type: [String],
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

/**
 * @typedef {mongoose.Model<mongoose.Document>} Notes
 */
let Notes;
try {
    Notes = mongoose.model('Notes');
}
catch {
    Notes = mongoose.model('Notes', NotesSchema);
}

export default Notes;