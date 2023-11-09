const express=require('express');
const { Add_Lead, getAllLead ,getLeadById, deleteAllLead, getLeadbyagentidandstatus} = require('../controllers/leadController');


const router=express.Router();
router.route("/add_lead").post(Add_Lead);
router.route("/get_all_lead").get(getAllLead);    

router.route("/get_lead_by_id/:id").get(getLeadById); 
router.route("/delete_all_lead").delete(deleteAllLead);
router.route("/get_Leadby_agentid_status").post(getLeadbyagentidandstatus)

module.exports=router;      