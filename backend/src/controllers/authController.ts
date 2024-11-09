import { Request, RequestHandler, Response } from 'express';
import admin  from '../config/firebase-admin'; 
import { validEmail, validPassword } from '../utils/validators';


export const createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body; 
    try {
        if (!validEmail(email)) { 
            res.status(400).json({error: 'email failure'});
            return;
        }
        const passwordValidation = validPassword(password)
        if (!passwordValidation.valid) {
            res.status(400).json({
                error: 'Password does not meet requirements',
                issues: passwordValidation.errors
            })
            return;
        }
        const user = await admin.auth().createUser({
            email, 
            password,
        });
        res.status(201).json({message: 'User created successfully'});
        return; 
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: 'Failed to create user' })
        return;
    }
}

