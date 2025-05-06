import crypto from "crypto";

const adminId = () => 100000000 + crypto.randomInt(100000, 999999);
const userId = () => 112200000 + crypto.randomInt(100000, 999999);
const noticesId = () => 771100000 + crypto.randomInt(100000, 999999);
const assignmentId = () => 881100000 + crypto.randomInt(100000, 999999);
const notesId = () => 991100000 + crypto.randomInt(100000, 999999);
const fileId = () => 661100000 + crypto.randomInt(100000, 999999);

export { adminId, userId, noticesId, assignmentId, notesId, fileId };