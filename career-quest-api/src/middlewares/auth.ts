// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import environments from '../config/environments';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Initial');
    console.log(token);

    if (!token) {
        res.status(401).json({ message: 'Access denied' });
        return;
    }

    console.log(token);

    jwt.verify(
        token,
        environments.JWT_SECRET ?? '',
        (err: Error | null, decoded: string | JwtPayload | undefined) => {
            if (err || !decoded) {
                res.status(403).json({ message: 'Invalid token' });
                return;
            }

            // Attach decoded token to res.locals
            res.locals.user = decoded as JwtPayload;
            next();
        }
    );
};
