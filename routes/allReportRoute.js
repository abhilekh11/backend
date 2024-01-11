const express=require('express');

const { LeadSourceReport,GetProductReportDateWise,EmployeesReportDetail } = require('../controllers/allReportController');

const router=express.Router();
  
router.route("/LeadSourceReport").post(LeadSourceReport); 
router.route("/GetProductReportDateWise").post(GetProductReportDateWise); 
router.route("/EmployeesReportDetail").get(EmployeesReportDetail); 


module.exports=router;     