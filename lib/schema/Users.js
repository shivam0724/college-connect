import mongoose from "mongoose";
import crypto from "crypto";

const UsersSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        index: true,
        unique: true,
        default: () => 112200000 + crypto.randomInt(100000, 999999)
    },
    enrollment: {
        type: String,
        required: true,
        index: true,
        default: "NULL"
    },
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        required: true
    },
    mothername: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "student", "faculty"],
        default: "student"
    },
    academics: {
        type: Object,
        required: true,
        default: {
            tenth: {
                board: String,
                year: Number,
                percentage: Number,
                school: String
            },
            twelfth: {
                board: String,
                year: Number,
                percentage: Number,
                school: String
            },
            diploma: {
                university: String,
                year: Number,
                percentage: Number,
                college: String
            },
            ug: {
                university: String,
                year: Number,
                cgpa: Number,
                college: String
            },
            pg: {
                university: String,
                year: Number,
                cgpa: Number,
                college: String
            }
        }
    },
    address: {
        type: Object,
        required: true,
        default: {
            address1: String,
            address2: String,
            city: String,
            state: String,
            country: String,
            pincode: Number
        }
    },
    image: {
        type: String,
        required: true,
        default: "/avatar/avatar.svg"
    },
    college: {
        type: Object,
        required: true,
        default: {
            name: String,
            course: String,
            branch: String,
            semester: Number,
            section: String,
            year: Number,
            collegeid: String,
        }
    },
    state: {
        type: String,
        required: false,
        default: "pending",
        enum: ["pending", "active", "rejected", "blocked"]
    }
},
    {
        timestamps: true
    }
)

/**
 * @typedef {mongoose.Model<mongoose.Document>} Users
 */
let Users;
try {
    Users = mongoose.model('Users');
}
catch {
    Users = mongoose.model('Users', UsersSchema);
}

export default Users;