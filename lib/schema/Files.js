import mongoose from "mongoose";
import { fileId } from "../id.js";

const FilesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        index: true,
        unique: true,
        default: () => fileId()
    },
    name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    savedAs: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["notices", "notes", "other"],
    },
    uploadedbyid: {
        type: Number,
        required: true,
    },
    hash: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
        default: "",
    },
    date: {
        type: Date,
        required: true,
        default: new Date().getTime(),
    },
},
    {
        timestamps: true,
    });

const Files = mongoose.models.Files || mongoose.model('Files', FilesSchema);

export default Files;