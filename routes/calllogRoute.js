const express=require('express');

const { Add_CallLog,getCallLogById,getCallLogByIdAndDate,deleteAllCallLog } = require('../controllers/callLogController');

const router=express.Router();
  
router.route("/add_call_log").post(Add_CallLog); 
router.route("/get_call_log_by_id/:id").get(getCallLogById); 
router.route("/get_call_log_by_id_date").post(getCallLogByIdAndDate);    
router.route("/delete_all_call_log").delete(deleteAllCallLog);
 
module.exports=router;     