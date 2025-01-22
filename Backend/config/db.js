import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => { 

    try {
         
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connection successful");

    } catch (error) { 

        console.log("Error occured while connecting to MongoDB", error);
    }
}

export default connectDB;