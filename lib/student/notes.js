"use server";

import connect from "../db/connect";
import Notes from "../schema/Notes";

/**
 * @param {Object} _class
 * @returns {Promise<Array>} notes - An array of note objects.
 * @description This function fetches all notes for a given class from the database.
 */
async function fetchNotes(_class){
    await connect();
    const classString = `${_class.branch} ${_class.semester}${_class.section}`;

    const notes = await Notes.find({ givento: { $in: [classString, "All"] } }).populate("faculty", "name email phone").sort({ givenon: -1 });

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

export { fetchNotes };