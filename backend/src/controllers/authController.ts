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

export const signIn = async (req: Request, res: Response): Promise<Response>  => {
    const { email, password} = req.body;

    try {
        if (!validEmail(email)) {
            return res.status(400).json({error: 'Invalid email format'});
        }
        const user = await admin.auth().getUserByEmail(email);
        const token = await admin.auth().createCustomToken(user.uid);
        return res.status(200).json({message: 'Sign in success', token: token})
    }   catch (error) {
        console.error('Sign-in error', error);
        return res.status(500).json({error: 'Failed to sign in'})
    }
}
