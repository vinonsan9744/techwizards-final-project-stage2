const express=require('express')

const router=express.Router();

const{createTask,
    getTasks,
    getFirstLastPostedData,
    getTasksByLocationName
}=require("../controllers/LocationController")

router.post("/",createTask);
router.get("/",getTasks);
router.get("/locationType/:locationType",getFirstLastPostedData);
router.get("/locationName/:locationName",getTasksByLocationName);

module.exports = router;