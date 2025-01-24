import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {

    console.log("Hello World");
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/task', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

connectDB();
