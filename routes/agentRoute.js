const express=require('express');

const { createAgent,getAllAgent,getAgentDetails } = require('../controllers/agentController');

const router=express.Router();
  
router.route("/add_agent").post(createAgent); 
router.route("/get_all_agent").get(getAllAgent);
router.route("/get_agent_details/:id").get(getAgentDetails);


   
module.exports=router;     