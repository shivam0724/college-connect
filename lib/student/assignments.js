"use server";

import connect from "@/lib/db/connect";
import Assignments from "@/lib/schema/Assignments";

/**
 * @param {Object} _class 
 * @returns <Promise<Array>} assignments - An array of assignment objects.
 * @description This function fetches all assignments for a given class from the database.
 */
async function fetchAssignments(_class) {
    const classString = `${_class.branch} ${_class.semester}${_class.section}`;
    console.log("Fetching assignments for class:", classString);

    await connect();
    const assignments = await Assignments.find({ givento: { $in: [classString, "All"] } }).populate("faculty", "name email phone").sort({ deadline: -1 });

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

export { fetchAssignments };