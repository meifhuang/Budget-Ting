import express from 'express';
import { addIncome } from "../controllers/incomeController"

const router = express.Router();

router.post('/', addIncome);

export default router;