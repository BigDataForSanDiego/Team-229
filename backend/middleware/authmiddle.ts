import { Jwt, JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const authmiddleware = (req: AuthRequest, res: Response, next: NextFunction ) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'No token provided.' });
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.'});
  }
}