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
        topic: "Introduction to Supervised Learning",
        subject: { name: "Machine Learning", code: "ML-101" },
        description: "Explains the concept of supervised learning with examples.",
        faculty: new mongoose.Types.ObjectId("680a2d21546465dc461972a2"),
        givento: ["CSE 6A", "CSE 6B"],
        givenon: new Date("2025-04-01"),
        file: "/notes/ml_supervised_learning.pdf"
    },
    {
        topic: "Network Protocols and their Importance",
        subject: { name: "Computer Network", code: "CN-201" },
        description: "Overview of network protocols and examples like TCP/IP.",
        faculty: new mongoose.Types.ObjectId("680a2d21546465dc461972a2"),
        givento: ["CSE 6A", "CSE 6B", "CSE 6C"],
        givenon: new Date("2025-04-05"),
        file: "/notes/network_protocols.pdf"
    },
    {
        topic: "Syntax Analysis in Compiler Design",
        subject: { name: "Compiler Design", code: "CD-301" },
        description: "Details syntax analysis techniques used in modern compilers.",
        faculty: new mongoose.Types.ObjectId("680a2d21546465dc461972a2"),
        givento: ["CSE 6A"],
        givenon: new Date("2025-04-10"),
        file: "/notes/syntax_analysis.pdf"
    },
    {
        topic: "Risk Assessment in Project Management",
        subject: { name: "Project Management", code: "PM-401" },
        description: "Explores risk assessment strategies in project management processes.",
        faculty: new mongoose.Types.ObjectId("680a2d21546465dc461972a2"),
        givento: ["CSE 6A", "CSE 6B"],
        givenon: new Date("2025-04-15"),
        file: "/notes/risk_assessment_pm.pdf"
    },
    {
        topic: "Unsupervised Learning Techniques",
        subject: { name: "Machine Learning", code: "ML-101" },
        description: "Discusses clustering and dimensionality reduction techniques.",
        faculty: new mongoose.Types.ObjectId("680a2d21546465dc461972a2"),
        givento: ["CSE 6A", "CSE 6C"],
        givenon: new Date("2025-04-20"),
        file: "/notes/ml_unsupervised_learning.pdf"
    }
];

console.log(await insertNotes(sampleNotes));