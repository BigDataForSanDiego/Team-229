import express from "express";
import mongoose from "mongoose";
import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { Jwt } from "jsonwebtoken";
import User from "../models/user";

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

export const login = async (req: Request, res: Response):Promise<void> => {
    
}

export const register = async(req: Request, res: Response):Promise<void> => {
    const {username, password, insurance} = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          res.status(400).json({ message: 'Username already exists' });
          return;
    }
    const hashed = await bcrypt.hash(password, 10);
    
    }

    catch(error){

    }
}
