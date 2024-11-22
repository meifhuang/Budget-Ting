import { Request, RequestHandler, Response } from 'express';
import admin  from '../config/firebase-admin'; 
import { validEmail, validPassword } from '../utils/validators';
import { pool } from "../db";




export const createAccount = async (req: Request, res: Response) => {
    const { email, password, first_name, last_name } = req.body;

    try {
        if (!validEmail(email)) { 
            res.status(400).json({error: 'Email issue'});
            return;
        }
        const userRecord = await admin.auth().getUserByEmail(email).catch(() => null);
        if (userRecord) {
            res.status(400).json({ error: 'Email already exists. Please login or create another account.' });
            return;
        }
        const passwordValidation = validPassword(password)
        if (!passwordValidation.valid) {
            res.status(400).json({
                error: 'Password does not meet requirements. Please ensure you have a minimum of 6 characters, one uppercase, one lowercase, and no spaces',
                issues: passwordValidation.errors
            })
            return;
        }
        else { 
        const user = await admin.auth().createUser({
            email, 
            password,
        });
    
        const userValues = [user.uid, first_name, last_name, email, user.metadata.creationTime]
        const query = `INSERT INTO users(auth_id, first_name, last_name, email, created_at) VALUES($1, $2, $3, $4, $5)`; 
        const createdUser = await pool.query(query, userValues);
        
        if (createdUser) {
            res.status(201).json({message: 'User created successfully'});
        }
        else {
            res.status(500).json({message: 'User creation unsuccessful'})
        }

        return; 
        }
    }
    catch (error: any) {
        if (error.code === 'auth/email-already-exists') {
            res.status(400).json({error: 'Email already exists'})
            return;
        }
        else if (error.code === 'auth/invalid-password') {
            res.status(400).json({error: 'Password is too weak.'})
            return;
        }
        else {
        res.status(500).json({ error: error })
        return;
        }
    }
}


export const signIn = async (req: Request, res: Response) => {
    const { authId } = req.params;
    const query = `SELECT * FROM users WHERE auth_id = $1` ; 
    try {
        const queried = await pool.query(query, [authId]); 
        if (queried.rows.length > 0) {
            res.status(200).json(queried.rows[0]);
        }
        else {
            res.status(404).json({error: "User not found"});
        }
    }
    catch (err) { 
        console.error(err)
        res.status(500).json({error: 'Internal server error'});
        }
}