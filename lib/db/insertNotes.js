import mongoose from "mongoose";
import connect from "./connect.js";
import Notes from "../schema/Notes.js";

async function insertNotes(user) {
    await connect();

    const newNotes = await Notes.create(user);

    if (!newNotes) {
        throw new Error("User not created");
    }

    return newNotes;
}

const sampleNotes = [
    {
        "id": 991100123456,
        "topic": "Introduction to Machine Learning",
        "subject": {
            "name": "Machine Learning",
            "code": "CS-601"
        },
        "description": "An overview of basic ML concepts, including supervised and unsupervised learning.",
        faculty: new mongoose.Types.ObjectId("680a2d21546465dc461972a2"),
        "facultyid": 112200123457,
        "givento": [
            { "college": "LNCT", "branch": "AIML", "semester": 6, "section": "B" },
            { "college": "LNCTE", "branch": "CSE", "semester": 6, "section": "C" }
        ],
        "forall": false,
        "givenon": 1714670766000,
        "file": "/notes/notes.pdf"
    },
    {
        "id": 991100123789,
        "topic": "Graph Data Structures",
        "subject": {
            "name": "Data Structures",
            "code": "CS-303"
        },
        "description": "Detailed explanation of graphs, including types, traversals, and applications.",
        faculty: new mongoose.Types.ObjectId("680a2d21546465dc461972a2"),
        "facultyid": 112200123457,
        "givento": [
            { "college": "LNCTS", "branch": "DS", "semester": 4, "section": "D" },
            { "college": "LNCP", "branch": "IT", "semester": 4, "section": "E" }
        ],
        "forall": false,
        "givenon": 1714670766000,
        "file": "/notes/notes.pdf"
    },
    {
        "id": 991100124567,
        "topic": "Neural Networks and Deep Learning",
        "subject": {
            "name": "Machine Learning",
            "code": "CS-601"
        },
        "description": "Introduction to neural networks, deep learning architectures, and training models.",
        faculty: new mongoose.Types.ObjectId("680a2d21546465dc461972a2"),
        "facultyid": 112200123457,
        "givento": [
            { "college": "LNCTU", "branch": "AIDS", "semester": 7, "section": "F" },
            { "college": "LNCT", "branch": "CY", "semester": 7, "section": "G" }
        ],
        "forall": false,
        "givenon": 1714670766000,
        "file": "/notes/notes.pdf"
    }
]


console.log(await insertNotes(sampleNotes));