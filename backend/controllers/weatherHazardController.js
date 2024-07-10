const weatherHazardModel = require ("../models/weatherHazardModel");

// to create a post method 
const createTask = async(req,res)=>{
    const {HazardID,WeatherID,temperature,visibility,hazardType,location,time} =req.body;
    try{
        const weatherHazard=await weatherHazardModel.create({HazardID,WeatherID,temperature,visibility,hazardType,location,time})
        res.status(200).json(weatherHazard)
    } catch(e){
        res.status(400).json({error: e.message});
    }

};

module.exports={createTask};