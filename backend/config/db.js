import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk"; // Importing chalk for colored logs

dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        });
        console.log(chalk.yellow(`MongoDB Connected: ${conn.connection.host}`)); // Log success message in green
    } catch (error) {
        console.log(chalk.red("Failed to connect to MongoDB:", error.message)); // Log error message in red
        process.exit(1);
    }
};
