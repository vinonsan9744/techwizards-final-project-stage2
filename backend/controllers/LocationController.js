const LocationModel = require ("../models/LocationModel");

// to create a post method 
const createTask = async(req,res)=>{
    const {locationId,locationName,locationType,locationContactNumber} =req.body;
    try{
        const Location=await LocationModel.create({locationId,locationName,locationType,locationContactNumber})
        res.status(200).json(Location)
    } catch(e){
        res.status(400).json({error: e.message});
    }

};

// to create a Get method to all
const getTasks = async (req,res) => {
    try{
    const Location = await LocationModel.find({});
    res.status(200).json(Location);
    } catch (e){
        res.status(400).jeson({ error:e.message});
    }
};
// GET method to retrieve first and last posted data for a specific locationType
const getFirstLastPostedData = async (req, res) => {
    const { locationType } = req.params; // Assuming locationType is passed as a parameter

    try {
        // Find the first posted data entry for the locationType
        const firstPostedData = await LocationModel.findOne({ locationType }).sort({ createdAt: 1 });

        // Find the last posted data entry for the locationType
        const lastPostedData = await LocationModel.findOne({ locationType }).sort({ createdAt: -1 });

        res.status(200).json({ firstPostedData, lastPostedData });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// Get hazard tasks by locationName
const getTasksByLocationName = async (req, res) => {
    const { locationName } = req.params;

    try {
        const location = await LocationModel.find({ locationName: locationName });

        if (!location || location.length === 0) {
            return res.status(404).json({ error: 'No datas found for this location' });
        }

        res.status(200).json(location);
    } catch (error) {
        console.error('Error fetching location:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports={createTask,getTasks,getFirstLastPostedData,getTasksByLocationName};