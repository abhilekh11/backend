const express=require('express');

const { Add_CallLog,getCallLogById } = require('../controllers/callLogController');

const router=express.Router();
  
router.route("/add_call_log").post(Add_CallLog); 
router.route("/get_call_log_by_id/:id").get(getCallLogById);     

module.exports=router;     