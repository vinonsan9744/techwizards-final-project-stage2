const mongoose = require("mongoose");
const administrativeOfficerModel = require ("../models/administrativeOfficerModel");

// to create a post method 
const createTask = async(req,res)=>{
    const { AD_ID,Name,Email,Password} =req.body;
    try{
        const AdministrativeOfficer=await administrativeOfficerModel.create({AD_ID,Name,Email,Password})
        res.status(200).json(AdministrativeOfficer)
    } catch(e){
        res.status(400).json({error: e.message});
    }

};

// to create a Get method to all
const getTasks = async (req,res) => {
    try{
    const administrativeOfficer = await administrativeOfficerModel.find({});
    res.status(200).json(administrativeOfficer);
    } catch (e){
        res.status(400).jeson({ error:e.message});
    }
};

// to get singletask -task GET by id
const getSingleTask = async (req,res) => {
    const{ id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:'administrativeOfficer not found'})
    }
    try{
        const singleTask = await administrativeOfficerModel.findById(id);
        res.status(200).json(singleTask);
    } catch (e){
        res.status(400).json({ error:e.message});
    }
};

module.exports={createTask,getTasks,getSingleTask};