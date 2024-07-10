const express=require('express')

const router=express.Router();

const{createTask}=require("../controllers/weatherHazardController")

router.post("/",createTask);

module.exports = router;