const express=require('express');

const { LeadSourceReport } = require('../controllers/allReportController');

const router=express.Router();
  
router.route("/LeadSourceReport").post(LeadSourceReport); 


module.exports=router;     