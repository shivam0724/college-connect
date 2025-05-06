"use server";

import mongoose from "mongoose";
import connect from "../db/connect";
import Notes from "../schema/Notes";
import Users from "../schema/Users";
import { notesId } from "../id";

/**
 * @param {Object} _class
 * @returns {Promise<Array>} notes - An array of note objects.
 * @description This function fetches all notes for a given class from the database.
 */
async function fetchNotes(_class) {
    await connect();
    const notes = await Notes.find({ $or: [{ givento: { $in: [_class] } }, { forall: true }] }, "-_id -__v -createdAt -updatedAt").populate("faculty", "name email phone").sort({ givenon: -1 });

    if (!notes) {
        return [];
    }

    return notes.map((note) => ({
        id: note.id,
        topic: note.topic,
        description: note.description,
        subject: `${note.subject.name} (${note.subject.code})`,
        givenby: note.faculty.name,
        givenon: new Date(note.givenon).toLocaleDateString(),
        file: note.file
    }));
}

async function fetchNotesByFaculty(id) {
    await connect();

    if (!id) {
        return null;
    }

    const notes = await Notes.find({ facultyid: id }, "-_id -__v -createdAt -updatedAt -givento._id").populate("faculty", "name email phone").sort({ givenon: -1 }).lean();

    if (!notes) {
        return null;
    }

    return notes.map((note) => ({
        id: note.id,
        topic: note.topic,
        description: note.description,
        subject: `${note.subject.name} (${note.subject.code})`,
        forall: note.forall,
        givento: note.givento,
        givenby: note.faculty.name,
        givenon: new Date(note.givenon).toLocaleDateString(),
        file: note.file
    }));
}

async function postNotes(data) {
    try {
        const faculty = await Users.findOne({ id: data.facultyid }, { _id: 1 }).lean();

        if (!faculty) {
            throw new Error("Faculty not found! Try Login Again.");
        }

        const notes = await Notes.create({
            id: notesId(),
            ...data,
            faculty: faculty._id,
        });

        if (!notes) {
            throw new Error("Failed to create notes.");
        }

        return true;
    } catch (error) {
        console.error("Error posting notes:", error);
        throw new Error(error.message || "Failed to post notes. Please try again.");
    }
}

async function deleteNote(id) {
    if (!id) {
        throw new Error("ID is required to delete notes.");
    }

    const notes = await Notes.findOneAndDelete({id: id}).lean();

    if (!notes) {
        throw new Error("Failed to delete notes. Please try again.");
    }

    return true;
}

export { fetchNotes, fetchNotesByFaculty, postNotes, deleteNote };