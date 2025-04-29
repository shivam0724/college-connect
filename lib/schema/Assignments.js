import mongoose from "mongoose";
import Users from "./Users.js";

/**
 * @typedef {mongoose.Model<mongoose.Document>} Assignments
 */
const AssignmentsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        index: true,
        unique: true,
        default: () => 881100000 + Math.floor(Math.random() * 1000000)
    },
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    subject: {
        type: Object,
        required: true,
        index: true,
        default: {
            name: String,
            code: String,
        }
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    givento: {
        type: Array,
        required: true,
        default: [String]
    },
    givenon: {
        type: Date,
        required: true,
        default: new Date().getTime()
    },
    deadline: {
        type: Date,
        required: true,
    },
},
    {
        timestamps: true
    }
)

/**
 * @typedef {mongoose.Model<mongoose.Document>} Assignments
 */
let Assignments;
try {
    Assignments = mongoose.model('Assignments');
}
catch {
    Assignments = mongoose.model('Assignments', AssignmentsSchema);
}

export default Assignments;