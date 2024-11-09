import express from 'express';
import { createAccount } from "../controllers/authController";
const router = express.Router();

router.post('/signup', createAccount);

export default router;