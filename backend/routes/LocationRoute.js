const express=require('express')

const router=express.Router();

const{createTask,
    getTasks,
    getFirstLastPostedData,
    getTasksByLocationName,
    deleteTask
}=require("../controllers/LocationController")

router.post("/",createTask);
router.get("/",getTasks);
router.get("/locationType/:locationType",getFirstLastPostedData);
router.get("/locationName/:locationName",getTasksByLocationName);
router.get("/:id",deleteTask);

module.exports = router;