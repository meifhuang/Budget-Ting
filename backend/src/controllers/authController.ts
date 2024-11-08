import { Request, Response } from 'express';
import admin  from '../config/firebase-admin'; 

const createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await admin.auth().createUser({
            email, 
            password,
        });
        res.status(201).json({message: 'User created successfully'});
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({error: 'Failed to create user'})
    }
}

export default createAccount;


