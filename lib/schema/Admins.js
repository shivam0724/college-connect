import mongoose from "mongoose";

const AdminsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        index: true,
        unique: true,
        default: () => 100000000 + crypto.randomInt(100000, 999999)
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
        enum: ["admin", "super admin"],
        default: "admin"
    }
},
{
    timestamps: true,
}
)

/**
 * @typedef {mongoose.Model<mongoose.Document>} Admins
 */
let Admins;
try {
    Admins = mongoose.model('Admins');
}
catch {
    Admins = mongoose.model('Admins', AdminsSchema);
}

export default Admins;