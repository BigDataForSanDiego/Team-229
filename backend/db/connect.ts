import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    try {
        mongoose.set('debug', true);
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error('Unexpected error', error);
        }
        process.exit(1);
    }
};