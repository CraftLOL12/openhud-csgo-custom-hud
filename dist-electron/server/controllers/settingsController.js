import { getSettings, updateSettings } from "../services/index.js";
export const getSettingsController = (req, res) => {
    try {
        const settings = getSettings();
        res.status(201).json(settings);
    }
    catch (error) {
        res.status(400).json("Settings fetch failed");
        console.log(error);
    }
};
export const updateSettingsController = (req, res) => {
    const { key, value } = req.body;
    try {
        const result = updateSettings({ key, value });
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json("Settings update failed");
        console.log(error);
    }
};
