import express from "express";
import mongoose from "mongoose";
import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { Jwt, Secret } from "jsonwebtoken";
import User from "../models/user";
import { IUser } from "../models/user";

export const login = async (req: Request, res: Response):Promise<void> => {
    const {email, password} = req.body;
    try{
      const curUser = await User.findOne({email})
      if (!curUser){
        res.status(400).json({message: 'Account is not registered'})
        return;
      }
      const samePass = await bcrypt.compare(password, curUser.password)
      if (!samePass){
        res.status(400).json({message: 'Wrong password, please try again'})
      }
    }
    catch(error){

    }
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

    const token = jwt.sign({id: createUser._id, username: createUser.email}, process.env.JWT_SECRET as Secret, {expiresIn: '30d'})
    res.status(201).json({ token, message: 'User registered successfully' });
    }
    catch(error){
      console.error(error);
      res.status(500).json({ message: 'Error registering user' });
    }
}
