import express from "express"
import { Request, Response } from "express"
import User from "../models/user";
import fetch from "node-fetch";
interface Location {
    lat: number;
    lng: number;
}

// Interface for the geometry field in a place result
interface Geometry {
    location: Location;
}

// Interface for individual place results
interface PlaceResult {
    name: string;
    geometry: Geometry;
    vicinity: string; // This represents the address or vicinity of the place
    rating?: number; // Rating is optional because not all places have ratings
}

// Interface for the entire API response
interface PlacesApiResponse {
    results: PlaceResult[];
    status: string; // Status of the API response (e.g., "OK", "ZERO_RESULTS")
    error_message?: string; // Optional error message if something goes wrong
}

interface Hospital {
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    rating?: number;
}

export const getNearbyHospitals = async (req: Request, res: Response): Promise<void> => {
    try {
        const googleAPI = process.env.GOOGLE_API
        console.log(googleAPI)
        const { latitude, longitude } = req.body;
        const radius = 5000;
        const type = 'hospital';

        if (!latitude || !longitude) {
            res.status(400).json({ error: "Latitude and longitude are required." });
            return;
        }

        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${googleAPI}`;

        const response = await fetch(url);
        if (!response.ok) {
            console.error('Error with Google Places API:', response.statusText);
        }

        const data = (await response.json()) as PlacesApiResponse;
    
        if (data.status !== 'OK') {
            console.error('Google Places API error:', data.error_message);
        }

        const hospitals: Hospital[] = data.results.map((place) => ({
            name: place.name,
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
            address: place.vicinity || "Not available",
            rating: place.rating,
        }));

        res.status(200).json({ hospitals });

    } catch (error) {
        console.error("Error fetching nearby hospitals:", error);
        res.status(500).json({ error: "Error fetching nearby hospitals." });
    }
};

export const ERtimes = async (req: Request, res:Response): Promise<void> => {
    const {city, season, time} = req.body;
    const hospital = await fetch("http://localhost:5000/api/hospitals/nearbyHospitals");

    
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