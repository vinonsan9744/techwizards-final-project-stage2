const mongoose = require("mongoose");
const HazardModel = require("../models/HazardModel");

// to create a post method 
const createTask = async(req,res)=>{
  const {hazardId, hazardType, time, locationName, description } =req.body;
  try{
      const Hazard=await HazardModel.create({hazardId, hazardType, time, locationName, description })
      res.status(200).json(Hazard)
  } catch(e){
      res.status(400).json({error: e.message});
  }

};

// Get all hazard tasks
const getTasks = async (req, res) => {
    try {
        const hazards = await HazardModel.find({});
        res.status(200).json(hazards);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};
// Get a single hazard task by ID
const getSingleTask = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Hazard not found' });
    }
    try {
        const singleTask = await HazardModel.findById(id);
        res.status(200).json(singleTask);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};
// Get hazard tasks by locationName
const getTasksByLocationName = async (req, res) => {
    const { locationName } = req.params;

    try {
        const hazards = await HazardModel.find({ locationName: locationName });

        if (!hazards || hazards.length === 0) {
            return res.status(404).json({ error: 'No hazards found for this location' });
        }

        res.status(200).json(hazards);
    } catch (error) {
        console.error('Error fetching hazards:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports={createTask,getTasks,getSingleTask,getTasksByLocationName};