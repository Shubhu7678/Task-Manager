import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.get('/', (req, res) => { 

    console.log("Hello World");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
