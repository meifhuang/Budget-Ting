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
        // const passwordValidation = validPassword(password)
        // if (!passwordValidation.valid) {
        //     res.status(400).json({
        //         error: 'Password does not meet requirements',
        //         issues: passwordValidation.errors
        //     })
        //     return;
        // }
        else { 
        const user = await admin.auth().createUser({
            email, 
            password,
        });
        res.status(201).json({message: 'User created successfully'});
        return; 
        }
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: 'Failed to create user' })
        return;
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
