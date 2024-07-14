const mongoose = require("mongoose");

const locomotivePilotModel = require ("../models/locomotivePilotModel");

// to create a post method 
const createTask = async(req,res)=>{
    const {locomotivePilotID,locomotiveName,locomotivePhoneNo,locomotiveEmail,password} =req.body;
    try{
        const locomotivePilot=await locomotivePilotModel .create({locomotivePilotID,locomotiveName,locomotivePhoneNo,locomotiveEmail,password})
        res.status(200).json(locomotivePilot)
    } catch(e){
        res.status(400).json({error: e.message});
    }

};

// to get all -task GET
const getTasks = async (req,res) => {
    try{
    const locomotivePilot = await locomotivePilotModel.find({});
    res.status(200).json(locomotivePilot);
    } catch (e){
        res.status(400).jeson({ error:e.message});
    }
};

// to get singletask -task GET by id
const getSingleTask = async (req,res) => {
    const{ id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:'locomotivePilot not found'})
    }
    try{
        const locomotivePilot = await locomotivePilotModel.findById(id);
        res.status(200).json(locomotivePilot);
    } catch (e){
        res.status(400).json({ error:e.message});
    }
};

// To get task by locomotivePilotID
const getTaskById = async (req, res) => {
    const { locomotivePilotID } = req.params;

    try {
        const locomotivePilot = await locomotivePilotModel.findOne({ locomotivePilotID });

        if (!locomotivePilot) {
            return res.status(404).json({ error: 'Locomotive pilot not found' });
        }

        res.status(200).json(locomotivePilot);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// To update task by locomotivePilotID
const updateTaskById = async (req, res) => {
    const { locomotivePilotID } = req.params;
    const updates = req.body;
  
    try {
      const locomotivePilot = await locomotivePilotModel.findOneAndUpdate(
        { locomotivePilotID },
        { $set: updates },
        { new: true, runValidators: true }
      );
  
      if (!locomotivePilot) {
        return res.status(404).json({ error: 'Locomotive pilot not found' });
      }
  
      res.status(200).json(locomotivePilot);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };

// To login locomotive pilot
const loginTask = async (req, res) => {
    const { locomotivePilotID, password } = req.body;
    try {
        const locomotivePilot = await locomotivePilotModel.findOne({ locomotivePilotID });
        if (!locomotivePilot || locomotivePilot.password !== password) {
            return res.status(401).json({ error: 'Invalid locomotivePilotID or password' });
        }
        res.status(200).json({ message: 'Login successful', locomotivePilot });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

module.exports={createTask,getTasks,getSingleTask,getTaskById,updateTaskById,loginTask};