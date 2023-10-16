const express=require('express');

const { createAgent,getAllAgent,getAgentDetails,deleteAgent, loginAgent } = require('../controllers/agentController');

const router=express.Router();
  
router.route("/add_agent").post(createAgent); 
router.route("/get_all_agent").get(getAllAgent);
router.route("/get_agent_details/:id").get(getAgentDetails);

router.route("/agent_delete/:id").delete(deleteAgent);
router.route("/agent_login").post(loginAgent);
   
module.exports=router;     