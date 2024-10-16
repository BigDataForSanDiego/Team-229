import express from "express";
import mongoose from "mongoose";
import { Response, Request } from "express";
import jwt from 'jsonwebtoken';
import { Jwt } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

export const login = async (req: Request, res: Response):Promise<void> => {
    
}

export const register = async(req: Request, res: Response):Promise<void> => {

}
