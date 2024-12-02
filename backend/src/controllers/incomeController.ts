import { Request, RequestHandler, Response } from 'express';
import { pool } from "../db";


export const getIncome = async (req: Request, res: Response) => {

}



export const addIncome = async (req: Request, res: Response) => {
    const { amount, frequency, source, userId } = req.body;

    try { 
        if (!amount || !frequency || !source || !userId) {
            res.status(400).json({error: 'Missing field'})
        }
        console.log(req.body)

    }
    catch(e) {
        console.error(e)
    }

}