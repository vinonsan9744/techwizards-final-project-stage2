const WeatherModel = require ("../models/WeatherModel");

// to create a post method 
const createTask = async(req,res)=>{
    const {WeatherID,temperature,windSpeed,precipitation,visibility,current_location,next_location} =req.body;
    try{
        const Weather=await WeatherModel.create({WeatherID,temperature,windSpeed,precipitation,visibility,current_location,next_location})
        res.status(200).json(Weather)
    } catch(e){
        res.status(400).json({error: e.message});
    }

};

module.exports={createTask};