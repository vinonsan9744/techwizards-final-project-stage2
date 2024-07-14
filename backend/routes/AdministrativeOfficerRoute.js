const express=require('express')

const router=express.Router();

const{createTask,
    getTasks,
    getSingleTask,
    loginTask
}=require("../controllers/administrativeOfficerController")


router.post("/",createTask);
router.get("/",getTasks);
router.get("/:id",getSingleTask);
router.post("/login", loginTask);  // Add the login route



module.exports = router;