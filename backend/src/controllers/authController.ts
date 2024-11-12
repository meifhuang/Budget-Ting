import { Request, RequestHandler, Response } from 'express';
import admin  from '../config/firebase-admin'; 
import { validEmail, validPassword } from '../utils/validators';



export const createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body;
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
        res.status(201).json({message: 'User created successfully'});
        return; 
        }
    }
    catch (error: any) {
        // console.error("Error creating user:", error);
        if (error.code === 'auth/email-already-exists') {
            res.status(400).json({error: 'Email already exists'})
            return;
        }
        else if (error.code === 'auth/invalid-password') {
            res.status(400).json({error: 'Password is too weak.'})
            return;
        }
        else {
        res.status(500).json({ error: 'Failed to create user' })
        return;
        }
    }
}


// export const signIn = async (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     try {
//         if (!validEmail(email)) {
//             res.status(400).json({error: 'Invalid email format'});
//             return; 
//         }
//         const firebaseAPIKey = process.env.FIREBASE_API_KEY
//         const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseAPIKey}`;
//         const response = await axios.post(signInUrl, {
//             email, password, returnSecureToken: true}) 

        
//         res.status(200).json({message: 'Sign in success', token: token})
//         return; 

//     }   catch (error) {
//         console.error('Sign-in error', error);
//         res.status(500).json({error: 'Failed to sign in'})
//         return;
//     }
// }
