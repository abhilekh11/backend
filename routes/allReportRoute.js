const express=require('express');

const { LeadSourceReport,GetProductReportDateWise } = require('../controllers/allReportController');

const router=express.Router();
  
router.route("/LeadSourceReport").post(LeadSourceReport); 
router.route("/GetProductReportDateWise").post(GetProductReportDateWise); 


module.exports=router;     