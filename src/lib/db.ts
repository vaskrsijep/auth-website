import mongoose from "mongoose";

export const connectMongoDB = async () => {
    if(mongoose.connections[0].readyState) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("MongoDB connected");
    } catch (error) {
        throw new Error("Failed to connect to MongoDB");
    }
};
