const express=require('express');
const { Add_Lead, getAllLead ,getLeadById} = require('../controllers/leadController');


const router=express.Router();
router.route("/add_lead").post(Add_Lead);
router.route("/get_all_lead").get(getAllLead);    

router.route("/get_lead_by_id/:id").get(getLeadById); 

module.exports=router;     