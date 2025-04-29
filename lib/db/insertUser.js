import connect from "./connect.js";
import Users from "../schema/Users.js";

async function insertUser(user) {
    await connect();

    const newUser = await Users.create(user);
    
    if (!newUser) {
        throw new Error("User not created");
    }

    return newUser;
}

const dummyUser = {
    id: 112200123456,
    enrollment: "0157CS221111",
    username: "john_doe",
    password: "password123",
    name: "John Doe",
    fathername: "Richard Doe",
    mothername: "Jane Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    role: "student",
    state: "active",
    dob: new Date("2000-01-01"),
    academics: {
        tenth: {
            board: "CBSE",
            year: 2020,
            percentage: 85.5,
            school: "Springfield High"
        },
        twelfth: {
            board: "CBSE",
            year: 2022,
            percentage: 90.2,
            school: "Springfield High"
        },
        diploma: {
            university: null,
            year: null,
            percentage: null,
            college: null
        },
        ug: {
            university: "RGPV",
            year: 2026,
            percentage: 8.3,
            college: "LNCT"
        },
        pg: {
            university: null,
            year: null,
            percentage: null,
            college: null
        }
    },
    address: {
        address1: "123, Anand Nagar",
        address2: "Raisen Road",
        city: "BHOPAL",
        state: "Madhya Pradesh",
        country: "INDIA",
        pincode: 462022
    },
    image: "/avatar/avatar.svg",
    college: {
        name: "LNCT",
        course: "BTECH",
        branch: "CSE",
        semester: 6,
        section: "A",
        year: 2026,
        collegeid: "0157CS221111"
    }
};

const sampleFacultyUser = {
    id: 112200123457,
    enrollment: "NULL",
    username: "dr_sunil_sharma",
    password: "securepassword123",
    name: "Dr. Sunil Sharma",
    fathername: "Ram Sharma",
    mothername: "Sita Sharma",
    email: "sunil.sharma@example.com",
    phone: "8876543210",
    role: "faculty",
    dob: new Date("1980-05-15"),
    academics: {
        tenth: {
            board: "CBSE",
            year: 1990,
            percentage: 89.5,
            school: "Government High School"
        },
        twelfth: {
            board: "CBSE",
            year: 1992,
            percentage: 91.2,
            school: "Government Higher Secondary School"
        },
        diploma: {
            university: null,
            year: null,
            percentage: null,
            college: null
        },
        ug: {
            university: "RGPV",
            year: 1996,
            percentage: 8.7,
            college: "ABC College of Engineering"
        },
        pg: {
            university: "RGPV",
            year: 2000,
            percentage: 8.9,
            college: "ABC College of Engineering"
        }
    },
    address: {
        address1: "45 Professor Lane",
        address2: "Flat 12B",
        city: "BHOPAL",
        state: "Madhya Pradesh",
        country: "India",
        pincode: 462002
    },
    image: "/avatar/avatar.svg",
    college: {
        name: "LNCT",
        course: "BTECH",
        branch: "CSE",
        semester: null,
        section: null, 
        year: null,
        collegeid: "FAC123456"
    },
    state: "active",
};


console.log(await insertUser(sampleFacultyUser))