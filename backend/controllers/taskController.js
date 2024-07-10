const mongoose = require("mongoose");
const taskModel = require ("../models/TaskModel");

// to create a post method 
const createTask = async(req,res)=>{
    const {Name,Subjects} =req.body;
    try{
        const Task=await taskModel.create({Name,Subjects})
        res.status(200).json(Task)
    } catch(e){
        res.status(400).json({error: e.message});
    }

};

// to get all -task GET
const getTasks = async (req,res) => {
    try{
    const tasks = await taskModel.find({});
    res.status(200).json(tasks);
    } catch (e){
        res.status(400).jeson({ error:e.message});
    }
};

// to get singletask -task GET by id
const getSingleTask = async (req,res) => {
    const{ id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:'Task not found'})
    }
    try{
        const singleTask = await taskModel.findById(id);
        res.status(200).json(singleTask);
    } catch (e){
        res.status(400).json({ error:e.message});
    }
};



module.exports = {createTask,getTasks, getSingleTask};