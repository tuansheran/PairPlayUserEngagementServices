import { Request, Response, NextFunction } from "express";

export const apiKeyAuth =  (req:Request, res:Response, next:NextFunction)=> {
    const clientKey = req.headers['x-api-key'];
    if (!clientKey || clientKey !== process.env.PAIR_PLAY_USER_ENGAGEMENT_SERVICES_API_KEY) {
        return res.status(403).json({ message: 'Forbidden: Invalid API key' })
    }
    next();
}