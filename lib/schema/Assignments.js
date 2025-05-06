import mongoose from "mongoose";
import Users from "./Users.js";
import { assignmentId } from "../id.js";

const AssignmentsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        index: true,
        unique: true,
        default: () => assignmentId
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
        required: true,
        default: [{
            college: String,
            branch: String,
            semester: Number,
            section: String,
        }]
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

const Assignments = mongoose.models.Assignments || mongoose.model('Assignments', AssignmentsSchema);

export default Assignments;