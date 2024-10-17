import express from "express"
import { Request, Response } from "express"
import User from "../models/user";
import fetch from "node-fetch";

interface mapElement {
    tags?: {
        name?: string;
        address?: string;
    };
    lat: number;
    lon: number;
}

interface mapResponse {
    elements: mapElement[];
}

export const getNearbyHospitals = async (req: Request, res: Response): Promise<void> => {
    try {
        const { latitude, longitude } = req.body;

        if (!latitude || !longitude) {
            res.status(400).json({ error: "Latitude and longitude are required." });
            return;
        }

        const bbox = `${latitude - 0.02},${longitude - 0.02},${latitude + 0.02},${longitude + 0.02}`;
        const url = `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="hospital"](${bbox});out;`;

        const response = await fetch(url);
        const data = (await response.json()) as mapResponse;

        // Extract relevant hospital information (e.g., name, location)
        const hospitals = data.elements.map((element: any) => ({
            name: element.tags.name,
            latitude: element.lat,
            longitude: element.lon,
            address: element.tags.address || "Not available"
        }));

        res.status(200).json({ hospitals });
    } catch (error) {
        console.error("Error fetching nearby hospitals:", error);
        res.status(500).json({ error: "Error fetching nearby hospitals." });
    }
};

export const ERtimes = async (req: Request, res:Response): Promise<void> => {
    const {city, season, hospital, time} = req.body;
    
}
export const Cost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { _id, injury } = req.body; 
        if (!_id) {
            res.status(400).json({ error: "User ID is required." });
            return;
        } 
        const curUser = await User.findById(_id);
        if (!curUser) {
            res.status(404).json({ error: "User not found." });
            return;
        }
        


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
        return;
    }
}

export const Distance = async(req: Request, res: Response): Promise<void> => {
    const {location} = req.body;
    
}

export const takesInsurance = async(req: Request, res: Response): Promise<void> => {

}