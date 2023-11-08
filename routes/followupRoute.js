const express=require('express');
const { Add_Followup_Lead} = require('../controllers/followupController');


const router=express.Router();
router.route("/add_followup_lead").post(Add_Followup_Lead);

module.exports=router;     