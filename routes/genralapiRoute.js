const express=require('express');
const { YearlySaleApi, LeadSourceOverviewApi  } = require('../controllers/genralApiController');


const router=express.Router();

router.route("/YearlySaleApi").get(YearlySaleApi);
router.route("/lead_source_overview_api").get(LeadSourceOverviewApi);

module.exports=router;     