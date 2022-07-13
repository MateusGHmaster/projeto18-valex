import { Response, Request, NextFunction } from "express";

export default async function apiKeyMiddleware (req: Request, res: Response, next: NextFunction) {
    
    const key = req.headers['x-api-key'];

    if (!key) {
        throw {
            type: 'bad_request',
            message: 'Key: required'
        };
    }

    next();

}
