"use server";

import connect from "@/lib/db/connect";
import Assignments from "@/lib/schema/Assignments";
import Users from "../schema/Users";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

await connect();

/**
 * @param {Object} _class 
 * @returns <Promise<Array>} assignments - An array of assignment objects.
 * @description This function fetches all assignments for a given class from the database.
 */
async function fetchAssignments(_class) {
    const assignments = await Assignments.find({ givento: { $in: [_class] } }, "-_id -__v -createdAt -updatedAt -givento._id").populate("faculty", "name email phone").sort({ deadline: -1 });

    if (!assignments) {
        return [];
    }

    return assignments.map((assignment) => ({
        id: assignment.id,
        title: assignment.title,
        description: assignment.description,
        subject: `${assignment.subject.name} (${assignment.subject.code})`,
        givenby: assignment.faculty.name,
        givenon: new Date(assignment.givenon).toLocaleDateString(),
        deadline: new Date(assignment.deadline).toLocaleDateString(),
    }));
}

async function fetchAssignmentByFaculty(id) {
    if (!id) {
        return null;
    }

    const assignment = await Assignments.find({ facultyid: id }, "-_id -__v -createdAt -updatedAt -givento._id").populate("faculty", "name email phone").sort({ deadline: -1 }).lean();

    if (!assignment) {
        return null;
    }

    return assignment.map((assignment) => ({
        id: assignment.id,
        title: assignment.title,
        description: assignment.description,
        subject: `${assignment.subject.name} (${assignment.subject.code})`,
        givento: assignment.givento,
        givenon: new Date(assignment.givenon).toLocaleDateString(),
        deadline: new Date(assignment.deadline).toLocaleDateString(),
    }));
}

async function postAssignment(assignment, id) {
    const faculty = await Users.findOne({ id }, { _id: 1 }).lean();
    if (!faculty) {
        return null;
    }

    const newAssignment = await Assignments.create({
        ...assignment,
        faculty: faculty._id,
    })

    if (!newAssignment) {
        return { error: true, message: "Failed to create assignment" };
    }

    return { error: false, message: "Assignment created successfully" };
}

async function deleteAssignment(id) {
    try {
        if (!id) {
            throw new Error("Assignment not found. Try refreshing the page.");
        }

        const assignment = await Assignments.findOneAndDelete({ id: id }).lean();

        if (!assignment) {
            throw new Error("Failed to delete assignment.");
        }

        return true;
    } catch (error) {
        console.error("Error deleting assignment:", error);
        return { error: true, message: "Failed to delete assignment" };
    }
}

export { fetchAssignments, fetchAssignmentByFaculty, postAssignment, deleteAssignment };