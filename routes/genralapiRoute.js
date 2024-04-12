const express=require('express');
const multer = require('multer');
const upload = multer();

const { YearlySaleApi, LeadSourceOverviewApi,GetCalandarData
    ,CompanyDetails,GetCompanyDetails,
    DashboardLeadCount,UnAssignedDashboardLeadCount
    ,DashboardLeadCountOfUser,AgentWishLeadCount,AgentWishLeadCount1,DashboardLeadCountOfUserByTeamLeader,
    RealestateApi ,
    IncomeGraphOverviewForTeamLeader,IncomeGraphOverviewForUser,IncomeGraphOverview
} = require('../controllers/genralApiController');
const {LeadProductServiceOverviewApi}  =require('../controllers/allReportController')

const router=express.Router();

router.route("/YearlySaleApi").get(YearlySaleApi);
router.route("/lead_source_overview_api").get(LeadSourceOverviewApi); 

router.route("/Income_Graph_Overview").get(IncomeGraphOverview);  ////for admin
router.route("/IncomeGraphOverviewForTeamLeader").post(IncomeGraphOverviewForTeamLeader);  ////for tl
router.route("/IncomeGraphOverviewForUser").post(IncomeGraphOverviewForUser);  ////for user

router.route("/get_calander_data").get(GetCalandarData);  
router.route("/LeadProductServiceOverviewApi").get(LeadProductServiceOverviewApi);  
router.route("/CompanyDetails").post(CompanyDetails); 
router.route("/GetCompanyDetails").get(GetCompanyDetails);  

router.route("/DashboardLeadCount").get(DashboardLeadCount);  
router.route("/DashboardLeadCountOfUser").post(DashboardLeadCountOfUser);  
router.route("/DashboardLeadCountOfUserByTeamLeader").post(DashboardLeadCountOfUserByTeamLeader);  


router.route("/UnAssignedDashboardLeadCount").get(UnAssignedDashboardLeadCount);
router.route("/AgentWishLeadCount").get(AgentWishLeadCount); 

router.route("/AgentWishLeadCount1").post(AgentWishLeadCount1); 

/////////////// real estate Api
router.route('/RealestateApi').post(upload.none(), RealestateApi);
module.exports=router;     