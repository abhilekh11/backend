const express=require('express');
const { YearlySaleApi, LeadSourceOverviewApi, IncomeGraphOverview,GetCalandarData } = require('../controllers/genralApiController');
const {LeadProductServiceOverviewApi}  =require('../controllers/allReportController')

const router=express.Router();

router.route("/YearlySaleApi").get(YearlySaleApi);
router.route("/lead_source_overview_api").get(LeadSourceOverviewApi);
router.route("/Income_Graph_Overview").get(IncomeGraphOverview);  
router.route("/get_calander_data").get(GetCalandarData);  
router.route("/LeadProductServiceOverviewApi").get(LeadProductServiceOverviewApi);  


module.exports=router;     