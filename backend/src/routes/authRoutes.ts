import express from 'express';
import { createAccount, signIn } from "../controllers/authController";

const router = express.Router();

router.post('/signup', createAccount);
router.get('/signin/:authId', signIn); 

export default router;