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

// const sampleAssignment = {
//     title: "Types of Machine Learning",
//     description: "Explain the types of machine learning: supervised, unsupervised, and reinforcement learning. Include examples and use cases for each.",
//     subject: {
//         name: "Machine Learning",
//         code: "CS-601"
//     },
//     faculty: new mongoose.Types.ObjectId("680a2d21546465dc461972a2"),
//     givento: ["CSE A", "CSE B", "CSE C"], 
//     givenon: new Date("2025-04-24"),
//     deadline: new Date("2025-05-01")
// };

// const RLAssignment = {
//     title: "Introduction to Regression Learning",
//     description: "Provide an overview of regression learning, focusing on types such as linear regression, polynomial regression, and logistic regression. Discuss their applications in real-world scenarios, including predictive modeling and data trend analysis.",
//     subject: {
//         name: "Machine Learning",
//         code: "CS-601"
//     },
//     faculty: new mongoose.Types.ObjectId("680a2d21546465dc461972a2"),
//     givento: ["CSE A", "CSE B", "CSE C"],
//     givenon: new Date("2025-04-25"),
//     deadline: new Date("2025-05-05")
// };

const assignmentsss = [
  {
    "title": "Advanced Data Structures",
    "description": "Implement and analyze AVL trees and B-trees for efficient searching.",
    "subject": {
      "name": "Data Structures",
      "code": "CS301"
    },
    "faculty": "680a2d21546465dc461972a2",
    "facultyid": 112200123457,
    "givento": [{
      "college": "LNCT",
      "branch": "CSE",
      "semester": 4,
      "section": "A"
    }],
    "givenon": "2025-05-01T21:19:00Z",
    "deadline": "2025-05-15T23:59:00Z"
  },
  {
    "title": "Cyber Threat Analysis",
    "description": "Analyze recent cybersecurity threats and propose mitigation strategies.",
    "subject": {
      "name": "Cyber Security",
      "code": "CY402"
    },
    "faculty": "680a2d21546465dc461972a2",
    "facultyid": 112200123457,
    "givento": [{
      "college": "LNCTE",
      "branch": "CY",
      "semester": 5,
      "section": "B"
    }],
    "givenon": "2025-05-01T21:19:00Z",
    "deadline": "2025-05-20T23:59:00Z"
  },
  {
    "title": "AI in Healthcare",
    "description": "Research AI applications in medical diagnosis and treatment planning.",
    "subject": {
      "name": "Artificial Intelligence",
      "code": "AIML504"
    },
    "faculty": "680a2d21546465dc461972a2",
    "facultyid": 112200123457,
    "givento": [{
      "college": "LNCTS",
      "branch": "AIML",
      "semester": 6,
      "section": "C"
    }],
    "givenon": "2025-05-01T21:19:00Z",
    "deadline": "2025-05-25T23:59:00Z"
  },
  {
    "title": "IoT-Based Smart Home System",
    "description": "Develop an IoT-based home automation system using Raspberry Pi and sensors.",
    "subject": {
      "name": "Embedded Systems",
      "code": "ECE407"
    },
    "faculty": "680a2d21546465dc461972a2",
    "facultyid": 112200123457,
    "givento": [{
      "college": "LNCP",
      "branch": "ECE",
      "semester": 7,
      "section": "A"
    }],
    "givenon": "2025-05-01T21:19:00Z",
    "deadline": "2025-05-30T23:59:00Z"
  },
  {
    "title": "Predictive Analytics in Business",
    "description": "Use machine learning models to predict customer buying behavior.",
    "subject": {
      "name": "Machine Learning",
      "code": "DS605"
    },
    "faculty": "680a2d21546465dc461972a2",
    "facultyid": 112200123457,
    "givento": [{
      "college": "LNCTU",
      "branch": "DS",
      "semester": 8,
      "section": "B"
    }],
    "givenon": "2025-05-01T21:19:00Z",
    "deadline": "2025-06-05T23:59:00Z"
  }
]

console.log(await insertAssgn(assignmentsss));

// async function fetchAssignment() {
//     await connect();
//     const assignment = await Assignments.find({}).populate("faculty", "name email phone").exec();
//     return assignment;
// }

// console.log(await fetchAssignment());