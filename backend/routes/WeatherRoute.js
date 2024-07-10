const express=require('express')

const router=express.Router();

const{createTask}=require("../controllers/WeatherController")

router.post("/",createTask);

module.exports = router;