import mongoose from "mongoose";

const connect = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log(`MongoDB already connected ${mongoose?.connection?.host} ${new Date().toISOString()}`);
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/college');
        console.log(`MongoDB Connected: ${conn?.connection?.host} ${new Date().toISOString()}`);
    } catch (error) {
        console.error(error?.message);
        process.exit(1);
    }
}

export default connect;