const locomotivePilotHazardModel = require ("../models/locomotivePilotHazardModel");
const axios = require('axios');
// to create a post method 
const createTask = async(req,res)=>{

    const {hazardID,locomotivePilotID,locationName,hazardType,time,description} =req.body;
    try{
        const locomotivePilotHazard=await locomotivePilotHazardModel.create({hazardID,locomotivePilotID,locationName,hazardType,time,description})

        res.status(200).json(locomotivePilotHazard)
    } catch(e){
        res.status(400).json({error: e.message});
    }

};

// to create a Get method to all
const getTasks = async (req, res) => {
    try {
        const hazards = await locomotivePilotHazardModel.find({});
        const hazardsWithDetails = await Promise.all(hazards.map(async (hazard) => {
            try {
                const pilotResponse = await axios.get(`http://localhost:4000/api/locomotivePilot/locomotivePilotID/${hazard.locomotivePilotID}`);
                const pilot = pilotResponse.data;

                console.log(`Pilot data for ID ${hazard.locomotivePilotID}:`, pilot);

                const locationResponse = await axios.get(`http://localhost:4000/api/location/locationName/${encodeURIComponent(hazard.locationName)}`);
                const location = locationResponse.data;

                console.log(`Location data for name ${hazard.locationName}:`, location);

                return {
                    ...hazard._doc,
                    locomotivePilotName: pilot ? pilot.locomotiveName : null,
                    locomotivePilotPhoneNo: pilot ? pilot.locomotivePhoneNo : null,
                    locationContactNumber: location && location[0] ? location[0].locationContactNumber : null,
                };
            } catch (error) {
                console.error(`Failed to fetch data for hazard ${hazard.hazardID}:`, error.message);
                return {
                    ...hazard._doc,
                    locomotivePilotName: null,
                    locomotivePilotPhoneNo: null,
                    locationContactNumber: null,
                };
            }
        }));
        res.status(200).json(hazardsWithDetails);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// GET method to retrieve a task by hazardID
const getTaskByHazardID = async (req, res) => {
    const { hazardID } = req.params;
    try {
        const hazard = await locomotivePilotHazardModel.findOne({ hazardID });
        if (!hazard) {
            return res.status(404).json({ error: 'Hazard not found' });
        }
        try {
            const pilotResponse = await axios.get(`http://localhost:4000/api/locomotivePilot/locomotivePilotID/${hazard.locomotivePilotID}`);
            const pilot = pilotResponse.data;

            const locationResponse = await axios.get(`http://localhost:4000/api/location/locationName/${encodeURIComponent(hazard.locationName)}`);
            const location = locationResponse.data;

            const hazardWithDetails = {
                ...hazard._doc,
                locomotivePilotName: pilot ? pilot.locomotiveName : 'No pilot found',
                locomotivePilotPhoneNo: pilot ? pilot.locomotivePhoneNo : 'No pilot found',
                locationContactNumber: location && location[0] ? location[0].locationContactNumber : 'No contact number found',
            };
            res.status(200).json(hazardWithDetails);
        } catch (error) {
            console.error(`Failed to fetch data for hazard ${hazard.hazardID}:`, error.message);
            res.status(200).json({
                ...hazard._doc,
                locomotivePilotName: 'Error fetching name',
                locomotivePilotPhoneNo: 'Error fetching phone number',
                locationContactNumber: 'Error fetching contact number',
            });
        }
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};
// DELETE method to delete a task by hazardID
const deleteTaskByHazardID = async (req, res) => {
    const { hazardID } = req.params;
    try {
        const result = await locomotivePilotHazardModel.findOneAndDelete({ hazardID });
        if (!result) {
            return res.status(404).json({ error: 'Hazard not found' });
        }
        res.status(200).json({ message: 'Hazard deleted successfully', deletedHazard: result });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};
module.exports={createTask,getTasks,getTaskByHazardID,deleteTaskByHazardID};