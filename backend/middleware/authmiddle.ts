import { Jwt, JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


export interface CustomRequest extends Request {
    user?: JwtPayload;
}

export const authmiddleware = (req: Request, res: Response, next: NextFunction ) => {

}