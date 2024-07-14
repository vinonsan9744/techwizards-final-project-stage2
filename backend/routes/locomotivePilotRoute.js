const express=require('express')

const router=express.Router();

const{createTask,
    getTasks,
    getSingleTask,
    getTaskById,
    updateTaskById,
    loginTask
}=require("../controllers/locomotivePilotController")


router.post("/",createTask);
router.get("/",getTasks);
router.get("/:id",getSingleTask);
router.get('/locomotivePilotID/:locomotivePilotID', getTaskById);
// Update a locomotive pilot by locomotivePilotID
router.patch('/locomotivePilotID/:locomotivePilotID',updateTaskById);
router.post("/login", loginTask);  // Add the login route
module.exports = router;