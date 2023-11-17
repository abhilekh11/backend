const express=require('express');

const { Add_CallLog } = require('../controllers/callLogController');

const router=express.Router();
  
router.route("/add_call_log").post(Add_CallLog); 

module.exports=router;     