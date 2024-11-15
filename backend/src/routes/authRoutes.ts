import express from 'express';
import { createAccount, signIn } from "../controllers/authController";
const router = express.Router();

router.post('/signup', createAccount);
router.get('/signin/:authId', signIn); 
// router.post('/signin', signIn);

export default router;