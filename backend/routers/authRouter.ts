import express from "express";
import login from "../controllers/authControllers";

const authRouter = express.Router();

authRouter.post('login', login);
authRouter.post('register', register)

export default authRouter;