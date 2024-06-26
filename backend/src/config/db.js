// src/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGOURL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGOURL);
        console.log('Database connected');
    } catch (err) {
        console.log('Database connection error:', err);
        process.exit(1);
    }
};

export default connectDB;
