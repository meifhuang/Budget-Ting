import * as dotenv from "dotenv";
import authRoutes from './routes/authRoutes';
dotenv.config(); 
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;

//Convert JSON requests to javascript object 
app.use(express.json());

//Parse form data and URL-encoded data to JSON objects 
app.use(express.urlencoded({extended: true}));

// Configure CORS to allow only specific origins
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use('/auth', authRoutes);

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})

