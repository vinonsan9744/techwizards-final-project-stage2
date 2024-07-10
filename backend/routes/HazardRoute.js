const express=require('express')
const mongoose = require("mongoose");

const router=express.Router();

const{createTask,
    getTasks,
    getSingleTask,
    getTasksByLocationName,
   
}=require("../controllers/HazardControllers")


router.post("/",createTask);
router.get("/",getTasks);
router.get("/:id",getSingleTask);
// Get hazard tasks by locationName
router.get('/locationName/:locationName',getTasksByLocationName);



module.exports = router;