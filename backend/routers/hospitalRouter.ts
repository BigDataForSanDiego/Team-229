import express from "express"
import { getNearbyHospitals, ERtimes } from "../controllers/hospitalController"
import authRouter from "./authRouter";

const hospitalRouter = express.Router();

hospitalRouter.post('/nearbyHospitals', getNearbyHospitals);
hospitalRouter.post('/ertimes', authRouter, ERtimes)

export default hospitalRouter