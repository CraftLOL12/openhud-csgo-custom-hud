import { createCoach, deleteCoach, getCoaches } from "../services/index.js";
export const getCoachesController = async (_req, res) => {
    try {
        const allPlayers = await getCoaches();
        res.status(201).json(allPlayers);
    }
    catch (error) {
        res.status(400).json("Coaches fetch failed");
        console.log(error);
    }
};
export const createCoachController = async (req, res) => {
    const { steamid } = req.body;
    try {
        const result = await createCoach(steamid);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json("Coach creation failed");
        console.log(error);
    }
};
export const deleteCoachController = async (req, res) => {
    const { steamid } = req.params;
    try {
        const result = await deleteCoach(steamid);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json("Failed to delete coach");
        console.log(error);
    }
};
