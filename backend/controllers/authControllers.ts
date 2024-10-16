import express from "express";
import mongoose from "mongoose";
import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { Jwt } from "jsonwebtoken";
import User from "../models/user";
import { IUser } from "../models/user";

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

export const login = async (req: Request, res: Response):Promise<void> => {
    const {email, password} = req.body;
    
}

export const register = async(req: Request, res: Response):Promise<void> => {
    const {email, password, insurance} = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          res.status(400).json({ message: 'Email already registered' });
          return;
    }
    const hashed = await bcrypt.hash(password, 10);
    const createUser = (await User.create({
      email,
      password: hashed,
      insurance
    })) as IUser;

    const token = jwt.sign({id: createUser._id, username: createUser.email}, secretKey, {expiresIn: '30d'})
    res.status(201).json({ token, message: 'User registered successfully' });
    }
    catch(error){
      console.error(error);
      res.status(500).json({ message: 'Error registering user' });
    }
}
