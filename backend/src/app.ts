const express = require('express');
import * as dotenv from "dotenv";
import {Request, Response} from 'express'; 
const cors = require('cors');
const app = express();
dotenv.config(); 

const PORT = process.env.PORT;
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;



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

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
    throw new Error(
      "Missing required environment variables. Check docs for more info."
    );
  }

//Testing app
app.get('/', (req: Request,res: Response)=> {
    res.send("Hello world!")
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})

