import mongoose from "mongoose";
import connect from "./connect.js";
import Assignments from "../schema/Assignments.js";

async function insertAssgn(user) {
    await connect();

    const newassgn = await Assignments.create(user);
    
    if (!newassgn) {
        throw new Error("User not created");
    }

    return newassgn;
}

const sampleAssignment = {
    title: "Types of Machine Learning",
    description: "Explain the types of machine learning: supervised, unsupervised, and reinforcement learning. Include examples and use cases for each.",
    subject: {
        name: "Machine Learning",
        code: "CS-601"
    },
    faculty: new mongoose.Types.ObjectId("680a2d21546465dc461972a2"),
    givento: ["CSE A", "CSE B", "CSE C"], 
    givenon: new Date("2025-04-24"),
    deadline: new Date("2025-05-01")
};

const RLAssignment = {
    title: "Introduction to Regression Learning",
    description: "Provide an overview of regression learning, focusing on types such as linear regression, polynomial regression, and logistic regression. Discuss their applications in real-world scenarios, including predictive modeling and data trend analysis.",
    subject: {
        name: "Machine Learning",
        code: "CS-601"
    },
    faculty: new mongoose.Types.ObjectId("680a2d21546465dc461972a2"),
    givento: ["CSE A", "CSE B", "CSE C"],
    givenon: new Date("2025-04-25"),
    deadline: new Date("2025-05-05")
};

console.log(await insertAssgn(RLAssignment));

// async function fetchAssignment() {
//     await connect();
//     const assignment = await Assignments.find({}).populate("faculty", "name email phone").exec();
//     return assignment;
// }

// console.log(await fetchAssignment());